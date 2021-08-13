// LIBRARY
import React, { useEffect } from "react";
import { ConnectedRouter } from "connected-react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// HISTORY
import { history } from "./redux/configStore";

// REDUX
import { userActions } from "./redux/modules/user";
import { useDispatch } from "react-redux";

// TOKEN
import { getToken } from "./common/token";

// STYLE
import GlobalStyle from "./common/globalStyle";

// PAGES
import {
  Main,
  Login,
  Signup,
  SignupInfo,
  Mypage,
  MypageEdit,
  Terms,
  PostList,
  PostDetail,
  PostWrite,
  PostModify,
  PostListMy,
  ChatList,
  MProfile,
  ChatRoom,
  Setting,
  SearchPostList,
  SearchPostListMy
} from "./pages/index";

function App() {
  const dispatch = useDispatch();
  const token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(userActions.logInCheck(token));
      dispatch(userActions.myInfoDB());
      dispatch(userActions.relationDB());
    } else {
      if (
        !token &&
        !["/login", "/signup", "/signup/info", "/terms"].includes(
          window.location.pathname
        )
      ) {
        alert("로그인이 필요한 서비스입니다!");
        return (window.location.href = "/login");
      }
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      {/* <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/terms" exact component={Terms} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signup/info" exact component={SignupInfo} />
          <Route path="/mypage" exact component={Mypage} />
          <Route path="/mypageedit" exact component={MypageEdit} />
          <Route path="/profile:userid" exact component={MProfile} />
          <Route path="/postlist" exact component={PostList} />
          <Route path="/postlist/my" exact component={PostListMy} />
          <Route path="/postdetail:postid" exact component={PostDetail} />
          <Route path="/postwrite" exact component={PostWrite} />
          <Route path="/postmodify" exact component={PostModify} />
          <Route path="/chat" exact component={ChatList} />
          <Route path="/chat/:id" exact component={ChatRoom} />
        </Switch>
      </Router> */}
      <ConnectedRouter history={history}>
        <Route exact path="/" component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/terms" exact component={Terms} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signup/info" exact component={SignupInfo} />
        <Route path="/mypage" exact component={Mypage} />
        <Route path="/mypageedit" exact component={MypageEdit} />
        <Route path="/profile:userid" exact component={MProfile} />
        <Route path="/postlist" exact component={PostList} />
        <Route path="/postlist/my" exact component={PostListMy} />
        <Route path="/postdetail/:postid" exact component={PostDetail} />
        <Route path="/postwrite" exact component={PostWrite} />
        <Route path="/postdetail/modify" exact component={PostModify} />
        <Route path="/chat" exact component={ChatList} />
        <Route path="/chat/:id" exact component={ChatRoom} />
        <Route path="/setting" exact component={Setting} />
        <Route path="/postlist/search/:keyword" exact component={SearchPostList} />
        <Route path="/postlist/search/my/:keyword" exact component={SearchPostListMy} />
      </ConnectedRouter>
    </>
  );
}

export default App;
