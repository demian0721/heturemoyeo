// // LIBRARY
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// // REDUXS
// import { searchActions } from '../redux/modules/search';

// // FUNCTION
// import InfinityScroll from '../common/infiniteScroll';

// // ELEMENTS
// import { Text } from '../elements/index';

// const Search = (props) => {
//   const dispatch = useDispatch();

//   const keyword = window.location.search.slice(1).split('=')[1];
//   const searchList = useSelector((state) => state.search.list);

//   useEffect(() => {
//     dispatch(searchActions.searchPostDB(keyword));

//     return () => {
//       dispatch(searchActions.getSearchList([], 0));
//     };
//   }, [keyword]);

//   return (
//     <>
//       {searchList.length ? (
//         <InfinityScroll postList={searchList} page="Search" keyword={keyword} />
//       ) : (
//         <Text fontSize="23px" margin="30px 30px 0 80px">
//           {decodeURI(keyword)}에 대한 검색 결과가 없습니다.
//         </Text>
//       )}
//     </>
//   );
// };

// Search.defaultProps = {};

// export default Search;
