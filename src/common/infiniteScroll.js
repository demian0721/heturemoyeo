// LIBRARY
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// REDUX
import { postActions } from '../redux/modules/post';

// ELEMENTS
import { Grid } from '../elements'

const InfiniteScroll = ({ PostList, page }) => {
    const dispatch = useDispatch();

    const [target, setTarget] = useState(null);

    useEffect(() => {
        const options = { threshold: 0.5 };

        const infiniteScroll = ([entries], observer) => {
            if (entries.isIntersecting) {
                new Promise((resolve) => {
                    if (page === 'Home') resolve(dispatch(postActions.getMorePostsDB()));
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
        </Grid>
    );
};

export default InfiniteScroll;