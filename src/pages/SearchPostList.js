// LIBRARY
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { searchActions } from "../redux/modules/search";

// FUNCTION
import InfiniteScroll from "../common/infiniteScroll";

// ELEMENTS
import { Grid, Button, Text } from "../elements/index";
import SearchIcon from "@material-ui/icons/Search";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

// HISTORY
import { history } from "../redux/configStore";

// COMPONENTS
import Footer from "../components/Footer";
import Header from "../components/Header";
import PostListButton from "../components/PostListButton";

const SearchPostList = (props) => {
  console.log(props);
  const keyword = props.match.params.keyword;
  const dispatch = useDispatch();
  // const keyword = window.location.search.slice(1).split('=')[1]
  const searchList = useSelector((state) => state.search.list);
  const inputword = useRef();
  useEffect(() => {
    dispatch(searchActions.searchPostDB(keyword));

    return () => {
      dispatch(searchActions.getSearchPost([], 0));
    };
  }, [keyword]);

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
              <SearchIcon style={{ color: "#767676" }} />
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

          <>
            {searchList.length ? (
              <InfiniteScroll
                postList={searchList}
                page="SearchPostList"
                keyword={keyword}
              />
            ) : (
              <div className="text-center font-bold text-lg" style={{ paddingTop:"30px",backgroundColor: "#efefef",height:"calc(100vh - 250px)"}}>
                '{decodeURI(keyword)}'에 대한 검색 결과가 없습니다.
              </div>
            )}
          </>

          <Grid
            padding="5px 0px"
            style={{ position: "fixed", bottom: "8%", right: "5%", zIndex: 99 }}
            width="auto"
            height=""
            overflow="visible"
          >
            <Button
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

export default SearchPostList;
