// LIBRARY
import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { postActions } from "../redux/modules/post";

//History
import { history } from "../redux/configStore";

// ELEMENTS
import { Grid, Text } from "../elements/index";

// COMPONENTS
import Header from "../components/Header";
import Details from "../components/PostDetail";
import axios from "../common/axios";

const PostDetail = (props) => {
  const postId = props.match.params.postid;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.postDetailInfo(postId));
  }, []);

  const postDetails = useSelector((state) => state.post.postDetail);
  const is_loaded = useSelector((state) => state.post.is_loaded);

  useEffect(() => {
    if (!postDetails) return;
    const tasker = async () => {
      try {
        const result = await axios.get("/api/post/posts/my?start=0&limit=1000");
        Object.assign(postDetails, {
          isExist:
            result?.data.filter((el) => Number(el.postId) === Number(postId))
              .length === 1,
        });
        return postDetails;
      } catch (e) {
        console.error(e);
      }
    };
    tasker();
  }, [postDetails]);

  return (
    <Style>
      <Header id="detail" postId={postId} writer={postDetails?.nickname} />
      {/* <Grid id="modifyBtn" height="" is_flex margin="10px 10px 0px 10px" position="relative" style={{ zIndex: "50", marginLeft: "80%" }}>
        <Text clickEvent={() => {history.push("/postmodify");}} margin="5px 5px 0px 5px" style={{ backgroundColor: null }}>Edit</Text>
        <Text onClick={deletepost} margin="5px 5px 0px 5px" style={{ cursor: "default" }}>삭제</Text>
      </Grid> */}

      <Grid width="" height="" margin="">
        {is_loaded && <Details Details={postDetails} postId={postId} />}
      </Grid>
    </Style>
  );
};

const Style = styled.div`
  align-items: center;
  margin-top: 75px;
  /* width: 100vw; */
  height: calc(100vh - 75px);
  background-color: #efefef;
  //styled component use
`;

export default PostDetail;
