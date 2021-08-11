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
import SearchIcon from '@material-ui/icons/Search';

// HISTORY
import { history } from "../redux/configStore";

// COMPONENTS
import Footer from "../components/Footer";
import Header from "../components/Header";
import PostListCard from "../components/PostListCard";
import PostListButton from "../components/PostListButton";

const PostListMy = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.getMyPostsDB());
  }, []);
  const PostList = useSelector((state) => state.post.list);

  return (
    <Style>
      <Grid height="">
        <Header>모임구하기</Header>
      </Grid>

      <Grid width="360px" height="" margin="auto"
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
            width: 100vw;
          `;
        }}
      >
        <Grid height="" bg="white">
          <Grid is_flex padding="18px" >
            <Grid is_flex padding="8px 8px" height="" bg="#EFEFEF"
              style={{margin: "auto",}}>
              <SearchIcon style={{color:"#767676"}}/>
              <input placeholder="제목, 내용, 태그 또는 날짜" style={{padding:"0px 5px",width:"100%", backgroundColor:"#EFEFEF"}}/>
            </Grid>
            <img src="/assets/postlist_input_calendar.png" style={{margin:"auto 0px auto 5px"}}/>
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
        <Footer>group</Footer>
      </Grid>
    </Style>
  );
};

const Style = styled.div`
    align-items: center;
    margin-top: 75px;
    width: 100vw;
    height: calc(100vh - 130px);
    background-color: #EFEFEF;
    //styled component use
`;

export default PostListMy;
