// LIBRARY
import React, { useEffect } from "react";
import styled from "styled-components";
import TodayIcon from "@material-ui/icons/Today";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { postActions } from "../redux/modules/post";

// FUNCTION
import InfiniteScroll from '../common/infiniteScroll';

// ELEMENTS
import { Grid, Button } from "../elements/index";
import SearchIcon from '@material-ui/icons/Search';

// HISTORY
import { history } from "../redux/configStore";

// COMPONENTS
import Footer from "../components/Footer";
import Header from "../components/Header";
import PostListButton from "../components/PostListButton";

import MyLocationIcon from "@material-ui/icons/MyLocation";


const PostList = (props) => {
  const dispatch = useDispatch();
  const PostList = useSelector((state) => state.post.list);

  useEffect(() => {
    dispatch(postActions.getPostsDB());

    return () => {
      dispatch(postActions.getPosts([],0));
    };
  }, []);
  
  return (
    <Style>
      <Grid height="">
        <Header>모임구하기</Header>
      </Grid>

      <Grid width="360px" height="" margin="auto">
        <Grid padding="18px" height="" bg="white">
          <Grid is_flex >
            <Grid is_flex padding="8px 8px" height="" bg="#EFEFEF"
              style={{
                // justifyContent: "space-between",
                margin: "auto",
              }}
            >
              <SearchIcon style={{color:"#767676"}}/>
              <input placeholder="제목, 내용, 태그 또는 날짜" style={{padding:"0px 5px",width:"100%", backgroundColor:"#EFEFEF"}}/>
            </Grid>
            <img src="/assets/postlist_input_calendar.png" style={{margin:"auto 0px auto 5px"}}/>
          </Grid>
          <PostListButton style={{borderBottom:"0.4px solid #767676"}} /> 
          
          <InfiniteScroll postList={PostList} page="PostList" />

          <Grid padding="5px 0px"
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
              // borderColor="#16C59B"
              clickEvent={() => {
                history.push("/postwrite"); 
              }}
              style={{ cursor: "pointer"}} 
            >
            <img src="/assets/floating_button_postwrite.png"
                  style={{
                  width: "50px",
                  height: "50px", 
                }}/>
            </Button>
            {/* <Button
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
              추가하기 <br /> (글쓰기버튼)
            </Button> */}
          </Grid>
        </Grid>
      </Grid>
      <Grid height="">
        <Footer />
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

export default PostList;
