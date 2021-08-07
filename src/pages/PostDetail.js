// LIBRARY
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { postActions } from "../redux/modules/post";

//History
import { history } from "../redux/configStore";

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

  const deletepost = () => {
    dispatch(postActions.deleteAPost(postId));
    console.log({"postId":postId})
  }

  return (
    <React.Fragment>
      
      <Header />
      <Grid margin="10px 10px 0px 10px" position="relative" is_flex style={{zIndex:"50", marginLeft:"80%"}}>
        <Text clickEvent={() => {history.push('/postmodify');}} margin="5px 5px 0px 5px" style={{backgroundColor:null}}>Edit</Text>
        <Text onClick={deletepost} margin="5px 5px 0px 5px" style={{cursor:"default"}}>삭제</Text>
      </Grid>
      

      <Grid width="360px" margin="50px auto">
        {!is_loaded ? <Details Details={postDetails} key={postId} postId={postId}/> : null}
      </Grid>
    </React.Fragment>
  );
};

export default PostDetail;
