// LIBRARY
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// REDUX
import { postActions } from '../redux/modules/post';
import { searchActions } from '../redux/modules/search';

// ELEMENTS
import { Grid } from '../elements'

// CONPONENTS
import PostListCard from "../components/PostListCard";

const InfiniteScroll = ({ postList, page, postId, keyword }) => {
    const dispatch = useDispatch();

    const [target, setTarget] = useState(null);

    useEffect(() => {
        const options = { threshold: 0.5 };

        const infiniteScroll = ([entries], observer) => {
            if (entries.isIntersecting) {
                new Promise((resolve) => {
                    if (page === 'PostList') resolve(dispatch(postActions.getMorePostsDB()));
                    if (page === 'SearchPostList') resolve(dispatch(searchActions.searchMorePostDB(keyword)));
                    if (page === 'SearchChatListMy') resolve(dispatch(searchActions.searchMoreRoomDB(keyword)));
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
        <Grid height="" margin="0px 0px 0px 0px">
            {postList.map((post, idx)=>{
                const isLast = idx === postList.length -1;

                if (post.postId === parseInt(postId)) return null;

                return (
                    <div ref={isLast ? setTarget : null} key={post.postId}>
                        <PostListCard {...post} />
                    </div>
                );
            })}
        </Grid>
    );
};

export default InfiniteScroll;