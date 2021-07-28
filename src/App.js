// LIBRARY
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { css } from 'styled-components';

// HISTORY
import { history } from './redux/configStore';

// REDUX
import { userActions } from './redux/modules/user';
import { useDispatch } from 'react-redux';

//TOKEN
import { getToken } from './common/token';

// STYLE
import GlobalStyle from './common/globalStyle';
import theme from './common/style';

// ELEMENTS
import { Grid } from './elements/index';

// COMPONENTS
import Permit from './components/Permit';

// PAGES
import { Main, Login, Signup, Mypage, Terms } from './pages/index';

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
      <div style={{ position: "absolute", zIndex: "100" }}>

      </div>
      <GlobalStyle />
      <Grid
        margin="0 auto"
        padding="0"
        width="100%"
        height="auto"
        style={{
          minWidth: '700px',
          position: 'relative',
          transition: 'height 480ms ease-out 0s',
        }}
        laptoptStyle={() => {
          return css`
            max-width: none;
            width: 100%;
          `;
        }}
        mobileStyle={() => {
          return css`
            width: 100%;
          `;
        }}
      >
        <ConnectedRouter history={history} style={{ position: "relative", zIndex: "8" }}>
          <Route exact path="/" component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signup/terms" exact component={Terms} />
          <Route path="/mypage" exact component={Mypage} />
        </ConnectedRouter>
      </Grid>
      <Permit></Permit>
    </ThemeProvider >
  );
}

export default App;
