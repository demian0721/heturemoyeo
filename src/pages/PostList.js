// LIBRARY
import React, { useEffect } from "react";
import TodayIcon from "@material-ui/icons/Today";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { postActions } from "../redux/modules/post";

// FUNCTION
import InfiniteScroll from '../common/infiniteScroll';

// ELEMENTS
import { Grid, Button } from "../elements/index";

// HISTORY
import { history } from "../redux/configStore";

// COMPONENTS
import Footer from "../components/Footer";
import Header from "../components/Header";
import PostListCard from "../components/PostListCard";
import PostListButton from "../components/PostListButton";

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
    <React.Fragment>
      <Grid>
        <Header />
      </Grid>

      <Grid width="360px" margin="50px auto">
        <Grid padding="18px" bg="#EFEFEF">
          <Grid is_flex padding="8px 8px" bg="white"
            style={{
              border: "1px solid #ccc",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <input placeholder="제목, 내용, 태그 또는 날짜" />
            <TodayIcon color="action" />
          </Grid>
          <PostListButton />
          
          <InfiniteScroll postList={PostList} page="PostList" />

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
              추가하기 <br /> (글쓰기버튼)
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Footer />
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
