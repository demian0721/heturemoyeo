// LIBRARY
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { postActions } from "../redux/modules/post";
import { searchActions } from '../redux/modules/search';

// FUNCTION
import InfiniteScroll from '../common/infiniteScroll';

// ELEMENTS
import { Grid, Button } from "../elements/index";

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
  // const searchDate = null;
  
  useEffect(() => {
    dispatch(postActions.getPostsDB());

    return () => {
      dispatch(postActions.getPosts([],0));
    };
  }, []);

  const search = () => {
    console.log(inputword.current.value);
    dispatch(searchActions.searchPostDB(inputword.current.value));
    history.push(`/postlist/search/${inputword.current.value}`);
  }
  const onKeyPress=(event)=>{
    if(event.key=='Enter'){
        search();
    }
}
  
  return (
    <Style>
      <Grid height="">
        <Header>모임구하기</Header>
      </Grid>

      <Grid width="360px" height="" margin="auto">
        <Grid height="" bg="white">
          <Grid is_flex padding="18px" >
            <Grid is_flex padding="8px 8px" height="" bg="#EFEFEF"
              style={{margin: "auto",}}>
              <SearchIcon style={{color:"#767676"}}/>
              <input type="text" placeholder="제목, 내용, 태그 또는 날짜" style={{padding:"0px 5px",width:"100%", backgroundColor:"#EFEFEF"}} ref={inputword}
                   onKeyPress={onKeyPress}/>
            </Grid>
            <img src="/assets/postlist_input_calendar.png" style={{margin:"auto 0px auto 5px"}}/>
          </Grid>
          <PostListButton>all</PostListButton>
          
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
          </Grid>
        </Grid>
      </Grid>
      <Grid height="">
        <Footer>group</Footer>
      </Grid>
    </Style>
  );
};

const Style = styled.div`
    align-items: center;
    margin-top: 75px;
    width: 100vw;
    height: 100%;
    background-color: #EFEFEF;
`;

export default PostList;
