// LIBRARY
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { postActions } from "../redux/modules/post";

// ELEMENTS
import { Button, Grid, Image, Input, Text, Title } from "../elements/index";

// COMPONENTS
import Header from "../components/Header";
import Details from "../components/PostDetail";

const PostDetail = (props) => {
  const postId = props.match.params.postid;
  const dispatch = useDispatch();
  
  useEffect(() => {dispatch(postActions.postDetailInfo(postId)); }, [   ]);

  const postDetails = useSelector((state) => state.post.postDetail);
  const is_loaded = useSelector((state)=>state.post.is_loaded);

  return (
    <React.Fragment>
      <Header />

      <Grid width="360px" margin="50px auto">
        {!is_loaded ? null : <Details Details={postDetails} key="post"/>}
      </Grid>
    </React.Fragment>
  );
};

export default PostDetail;
