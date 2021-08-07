// LIBRARY
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// REDUX
import { postActions } from '../redux/modules/post';

// ELEMENTS
import { Grid } from '../elements'

// CONPONENTS
import PostListCard from "../components/PostListCard";

const InfiniteScroll = ({ postList, page, postId }) => {
    const dispatch = useDispatch();

    const [target, setTarget] = useState(null);

    useEffect(() => {
        const options = { threshold: 0.5 };

        const infiniteScroll = ([entries], observer) => {
            if (entries.isIntersecting) {
                new Promise((resolve) => {
                    if (page === 'PostList') resolve(dispatch(postActions.getMorePostsDB()));
                }).then((res) => {
                    observer.unobserve(entries.target);
                });
            }
        };

        const io = new IntersectionObserver(infiniteScroll, options);
        if (target) io.observe(target);

        return () => io && io.disconnect();
    }, [target]);

    return (
        <Grid>
            {postList.map((post, idx)=>{
                const isLast = idx === postList.length -1;

                if (post.postId === parseInt(postId)) return null;

                return (
                    <div ref={isLast ? setTarget : null} key={post.postId}>
                        <PostListCard post={post} />
                    </div>
                );
            })}
        </Grid>
    );
};

export default InfiniteScroll;