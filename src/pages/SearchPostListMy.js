// // LIBRARY
// import React, { useRef, useEffect } from "react";
// import styled from "styled-components";
// import { useSelector, useDispatch } from "react-redux";

// // REDUX
// // import { postActions } from "../redux/modules/post";
// import { searchActions } from "../redux/modules/search";

// // FUNCTION
// import InfiniteScroll from "../common/infiniteScroll";

// // ELEMENTS
// import { Grid, Button, Text } from "../elements/index";
// import SearchIcon from "@material-ui/icons/Search";
// import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
// import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

// // HISTORY
// import { history } from "../redux/configStore";

// // COMPONENTS
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import PostListCard from "../components/PostListCard";
// import PostListButton from "../components/PostListButton";

// const SearchPostListMy = (props) => {
//   console.log(props);
//   const keyword = props.match.params.keyword;
//   const dispatch = useDispatch();
//   // const keyword = window.location.search.slice(1).split('=')[1]
//   // const PostList = useSelector((state) => state.post.list);
//   const searchList = useSelector((state) => state.search.list);
//   const inputword = useRef();
//   useEffect(() => {
//     dispatch(searchActions.searchPostDB(keyword));

//     return () => {
//       dispatch(searchActions.getSearchPost([], 0));
//     };
//   }, [keyword]);
//   // useEffect(() => {
//   //   dispatch(postActions.getMyPostsDB());
//   // }, []);

//   const search = () => {
//     console.log(inputword.current.value);
//     dispatch(searchActions.searchPostDB(inputword.current.value));
//     history.push(`/postlist/search/my/${inputword.current.value}`);
//   };
//   const onKeyPress = (event) => {
//     if (event.key == "Enter") {
//       search();
//     }
//   };
//   return (
//     <Style>
//       <Grid height="">
//         <Header>모임구하기</Header>
//       </Grid>

//       <Grid width="360px" height="" margin="auto">
//         <Grid height="" bg="white">
//           <Grid is_flex padding="18px">
//             <Grid
//               is_flex
//               padding="8px 8px"
//               height=""
//               bg="#EFEFEF"
//               style={{ margin: "auto" }}
//             >
//               <SearchIcon style={{ color: "#767676" }} />
//               <input
//                 type="text"
//                 placeholder="제목, 내용, 태그 또는 날짜"
//                 style={{
//                   padding: "0px 5px",
//                   width: "100%",
//                   backgroundColor: "#EFEFEF",
//                 }}
//                 ref={inputword}
//                 onKeyPress={onKeyPress}
//               />
//             </Grid>
//             <DateRangeOutlinedIcon
//               style={{ marginLeft: "5px", color: "#7B7B7B" }}
//             />
//           </Grid>
//           <PostListButton>my</PostListButton>

//           <>
//             {searchList.length ? (
//               <InfiniteScroll
//                 postList={searchList}
//                 page="SearchPostList"
//                 keyword={keyword}
//               />
//             ) : (
//               <Text fontSize="23px" margin="30px 30px 0 80px">
//                 {decodeURI(keyword)}에 대한 검색 결과가 없습니다.
//               </Text>
//             )}
//           </>

//           <Grid
//             padding="5px 0px"
//             style={{ position: "fixed", bottom: "8%", right: "5%", zIndex: 99 }}
//             width="auto"
//             height=""
//             overflow="visible"
//           >
//             <Button
//               // shadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
//               // padding="12px"
//               margin="0 0 10px"
//               radius="100%"
//               color="white"
//               hoverColor="#16C59B"
//               borderColor="none"
//               clickEvent={() => {
//                 history.push("/postwrite");
//               }}
//               style={{ cursor: "pointer", width: "50px", height: "50px" }}
//             >
//               <CreateOutlinedIcon />
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid height="">
//         <Footer>group</Footer>
//       </Grid>
//     </Style>
//   );
// };

// const Style = styled.div`
//   align-items: center;
//   margin-top: 75px;
//   width: 100vw;
//   height: 100%;
//   background-color: #efefef;
// `;

// export default SearchPostListMy;
