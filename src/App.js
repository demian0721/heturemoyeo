// LIBRARY
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

// HISTORY
import { history } from './redux/configStore';

// REDUX
import { userActions } from './redux/modules/user';

// TOKEN
import { getToken } from './common/token';

// STYLE
import GlobalStyle from './common/globalStyle';
import theme from './common/style';

// ELEMENTS
import { Grid } from './elements/index';
import { useDispatch } from 'react-redux';

// COMPONENTS
import Permit from './components/Permit';

// PAGES
import { Main, Login, Signup, Mypage } from './pages/index';

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
    <ThemeProvider theme={theme}>
      <div style={{position:"absolute", zIndex:"100"}}>

      </div>
      <GlobalStyle />

      <ConnectedRouter history={history} style={{position:"relative", zIndex:"8"}}>
          <Route exact path="/" component={Main} />
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup} />
          <Route path="/mypage" exact component={Mypage} />
        </ConnectedRouter>
    </ThemeProvider>
  );
}

export default App;
