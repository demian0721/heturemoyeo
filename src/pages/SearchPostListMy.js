// LIBRARY
import React, { useEffect } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import TodayIcon from "@material-ui/icons/Today";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { postActions } from "../redux/modules/post";

// ELEMENTS
import { Grid, Button } from "../elements/index";

// HISTORY
import { history } from "../redux/configStore";

// COMPONENTS
import Footer from "../components/Footer";
import Header from "../components/Header";
import PostListCard from "../components/PostListCard";
import PostListButton from "../components/PostListButton";

const SearchPostListMy = (props) => {
  const dispatch = useDispatch();
  const PostList = useSelector((state) => state.post.list);

  useEffect(() => {
    dispatch(postActions.getMyPostsDB());
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <Header/>
      </Grid>

      <Grid
        width="360px"
        margin="50px auto"
        // padding="55px 40px 100.2px"
        // shadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        tabletStyle={() => {
          return css`
            width: 95%;
          `;
        }}
        mobileStyle={() => {
          return css`
            padding: 15px 20px;
            width: 100%;
          `;
        }}
      >
        <Grid padding="18px" bg="#EFEFEF">
          <Grid
            padding="8px 8px"
            is_flex
            bg="white"
            style={{ border: "1px solid #ccc", justifyContent:"space-between", marginBottom:"10px" }}
          >
            <input placeholder="제목, 내용, 태그 또는 날짜"/>
            <TodayIcon color="action" />
          </Grid>

          <PostListButton/>

          {PostList.map((l, index) => {
            return <PostListCard key={l.id} idx={index} {...l} />;
          })}

          <Grid padding="5px 0px">
            <Button
              width="60px"
              height="60px"
              bg="#A7AAAD"
              color="black"
              radius="50px"
              fontSize="10px"
              clickEvent={() => {
                history.push("/postwrite");
              }}
              style={{ cursor: "pointer", float: "right" }}
            >
              추가하기 <br/> (글쓰기버튼)
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Footer/>
      </Grid>
    </React.Fragment>
  );
};

export default SearchPostListMy;
