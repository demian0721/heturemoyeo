// import React from "react";
// import _ from "lodash";

// const InfinityScroll = (props) => {
//   const { children, callNext, is_next, loading } = props;

//   // 쓰로틀을 적용합시다!
//   const _handleScroll = _.throttle(() => {
//       callNext();
//     }
//   }, 300;);

//   const handleScroll = React.useCallback(_handleScroll, [loading]);

//   React.useEffect(() => {
//     // 로딩 중이면, return!
//     if (loading) {
//       return;
//     }

//     // 다음 게 있으면 이벤트를 붙이고, 없으면 이벤트를 삭제해요!
//     if (is_next) {
//       window.addEventListener("scroll", handleScroll);
//     } else {
//       window.removeEventListener("scroll", handleScroll);
//     }

//     // 이 부분은 컴포넌트가 사라질 때 호출되는 부분입니다! (클린업이라고도 해요.)
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [is_next, loading]);

//   return (
//     <React.Fragment>
//       {children}
//     </React.Fragment>
//   );
// };

// InfinityScroll.defaultProps = {
//   children: null,
//   callNext: () => {},
//   is_next: false,
//   loading: false,
// };

// export default InfinityScroll;