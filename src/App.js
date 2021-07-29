// LIBRARY
import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

// HISTORY
import { history } from './redux/configStore';

// REDUX
import { userActions } from './redux/modules/user';
import { useDispatch } from 'react-redux';

//TOKEN
import { getToken } from './common/token';

// STYLE
import GlobalStyle from './common/globalStyle';

// PAGES
import { Main, Login, Signup, SignupInfo, Mypage, MypageEdit } from './pages/index';

function App() {

  const dispatch = useDispatch();
  const token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(userActions.checkDidIWriteDB());
      dispatch(userActions.logInCheck(token));
    }
  }, []);

  return (
    <>
    <GlobalStyle/>
    <ConnectedRouter history={history}>
      <Route exact path="/" component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/signup/info" exact component={SignupInfo} />
      <Route path="/mypage" exact component={Mypage} />
      <Route path="/mypageedit" exact component={MypageEdit} />
    </ConnectedRouter>
    </>
  )
}

export default App;
