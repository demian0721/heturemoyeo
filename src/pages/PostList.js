// LIBRARY
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

// REDUX
import { postActions } from "../redux/modules/post";
import { searchActions } from "../redux/modules/search";

// FUNCTION
import InfiniteScroll from "../common/infiniteScroll";

// ELEMENTS
import { Grid, Button } from "../elements/index";
import SearchIcon from "@material-ui/icons/Search";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

// HISTORY
import { history } from "../redux/configStore";

// COMPONENTS
import Footer from "../components/Footer";
import Header from "../components/Header";
import PostListButton from "../components/PostListButton";

const PostList = (props) => {
  const dispatch = useDispatch();
  const PostList = useSelector((state) => state.post.list);

  const inputword = useRef();

  useEffect(() => {
    dispatch(postActions.getPostsDB());

    return () => {
      dispatch(postActions.getPosts([], 0));
    };
  }, []);

  const search = () => {
    console.log(inputword.current.value);
    dispatch(searchActions.searchPostDB(inputword.current.value));
    history.push(`/postlist/search/${inputword.current.value}`);
  };
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <Style>
      <Grid height="">
        <Header>모임구하기</Header>
      </Grid>
      <Grid width="100%" height="" margin="75px auto 55px auto" maxWidth="540px">
        <Grid height="" bg="white">
          <Grid is_flex padding="18px">
            <Grid
              is_flex
              padding="8px 8px"
              height=""
              bg="#EFEFEF"
              style={{ margin: "auto" }}
            >
              <SearchIcon style={{ color: "#7B7B7B" }} />
              <input
                type="text"
                placeholder="제목, 내용, 또는 태그"
                style={{
                  padding: "0px 5px",
                  width: "100%",
                  backgroundColor: "#EFEFEF",
                }}
                ref={inputword}
                onKeyPress={onKeyPress}
              />
            </Grid>
          </Grid>
          <PostListButton>all</PostListButton>

          <InfiniteScroll postList={PostList} page="PostList" />

          <Grid
            padding="5px 0px"
            style={{ position: "fixed", bottom: "8%", right: "5%", zIndex: 99 }}
            width="auto"
            height=""
            overflow="visible"
          >
            <Link to="/postwrite">
              <Button
                margin="0 0 10px"
                radius="100%"
                color="white"
                hoverColor="#16C59B"
                borderColor="none"
                style={{ cursor: "pointer", width: "50px", height: "50px" }}
              >
                <CreateOutlinedIcon />
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid style={{ zIndex: 10 }}  height="">
      <Footer>group</Footer>
      </Grid>
      <div style={{position:"fixed",backgroundColor:"#efefef",zIndex:"1",width:"100vw",height:"100vh"}}/>
    </Style>
  );
};

const Style = styled.div`
  align-items: center;
  width: 100vw;
  height:100%;
  background-color: #EFEFEF;
`;

export default PostList;
