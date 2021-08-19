// LIBRARY
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { postActions } from "../redux/modules/post";
import { searchActions } from "../redux/modules/search";

// ELEMENTS
import { Grid, Button } from "../elements/index";
import SearchIcon from "@material-ui/icons/Search";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

// HISTORY
import { history } from "../redux/configStore";

// COMPONENTS
import Footer from "../components/Footer";
import Header from "../components/Header";
import PostListCard from "../components/PostListCard";
import PostListButton from "../components/PostListButton";

import axios from "../common/axios";

const PostListInvited = (props) => {
  const [invitePostList, setInvitePostList] = useState([]);
  const dispatch = useDispatch();
  const PostList = useSelector((state) => state.post.list);
  const inputword = useRef();
  // const searchDate = null;

  useEffect(() => {
    dispatch(postActions.getInvitedPostsDB());
    if (!PostList ?? PostList?.length === 0) return;
    PostList.map(async (el) => {
      try {
        const result = await axios.get("/api/post", {
          params: { postId: el.postId },
        });
        const resultData = result.data
        Object.assign(resultData, { PrevData: { ...el } });
        invitePostList.push(resultData);
      } catch (e) {}
    });
    return () => {};
  }, []);

  const search = () => {
    console.log(inputword.current.value);
    dispatch(searchActions.searchPostDB(inputword.current.value));
    history.push(`/postlist/search/${inputword.current.value}`);
  };
  const onKeyPress = (event) => {
    if (event.key == "Enter") {
      search();
    }
  };  

  return (
    <Style>
      <Grid>
        <Header>모임구하기</Header>
      </Grid>
      <Grid width="100%" height="" margin="75px 0 55px 0">
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
                placeholder="제목, 내용, 태그 또는 날짜"
                style={{
                  padding: "0px 5px",
                  width: "100%",
                  backgroundColor: "#EFEFEF",
                }}
                ref={inputword}
                onKeyPress={onKeyPress}
              />
            </Grid>
            <DateRangeOutlinedIcon
              style={{ marginLeft: "5px", color: "#7B7B7B" }}
            />
          </Grid>

          <PostListButton>invited</PostListButton>

          {invitePostList && invitePostList.map((l, index) => {
            return <PostListCard key={l.id} idx={index} {...l} />;
          })}

          <Grid
            padding="5px 0px"
            style={{ position: "fixed", bottom: "8%", right: "5%", zIndex: 99 }}
            width="auto"
            height=""
            overflow="visible"
          >
            <Button
              // shadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
              // padding="12px"
              margin="0 0 10px"
              radius="100%"
              color="white"
              hoverColor="#16C59B"
              borderColor="none"
              clickEvent={() => {
                history.push("/postwrite");
              }}
              style={{ cursor: "pointer", width: "50px", height: "50px" }}
            >
              <CreateOutlinedIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid style={{ zIndex: 10 }}>
        <Footer>group</Footer>
      </Grid>
    </Style>
  );
};

const Style = styled.div`
  align-items: center;
  width: 100vw;
  height: 100%;
  background-color: #efefef;
`;

export default PostListInvited;
