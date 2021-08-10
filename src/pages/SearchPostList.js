// LIBRARY
import React, { useEffect, useState } from "react";
import TodayIcon from "@material-ui/icons/Today";
import { useSelector, useDispatch } from "react-redux";

// REDUX
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

const SearchPostList = (props) => {
  const dispatch = useDispatch();
  const keyword = window.location.search.slice(1).split('=')[1];
  const searchList = useSelector((state) => state.search.list);

  useEffect(() => {
    dispatch(searchActions.searchPostDB(keyword));

    return () => {
      dispatch(searchActions.getSearchPost([], 0));
    };
  }, [keyword]);
  
  // const [keyword, setKeyword] = useState("");
  // const write = () =>{
  //     if (keyword===""){
  //         window.alert("검색어를 입력해주세요");
  //         return;
  //     }
  //     setKeyword();
  //     history.push(`/postlist/:keyword=${keyword}`);  
  // };

  // const handleChange=(event)=>{
  //   setKeyword(event.target.value);
  // }

  // const onKeyPress=(event)=>{
  //     if(event.key=='Enter'){
  //         write();
  //     }
  // }
  return (
    <React.Fragment>
      <Grid>
        <Header>모임구하기</Header>
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
            <input placeholder="제목, 내용, 태그 또는 날짜"
                  //  onKeyPress={onKeyPress}
                  //  onChange={handleChange} 
                  />
            <TodayIcon color="action" />
          </Grid>
          <PostListButton />
          
          <InfiniteScroll postList={searchList} page="SearchPostList" keyword={keyword} />

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

export default SearchPostList;
