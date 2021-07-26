// LIBRARY
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

// HISTORY
import { history } from '../redux/configStore';

// REDUX
import { userActions } from '../redux/modules/user';

// TOKEN
import { getToken } from '../common/token';

// STYLE
import GlobalStyle from '../common/globalStyle';

// ELEMENTS
import { Grid } from '../elements/index';
import { useDispatch } from 'react-redux';

// COMPONENTS
import Permit from './Permit';

// PAGES
import { Main, Login, Signup, Mypage } from './pages'

function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history} style={{position:"relative", zIndex:"8"}}>
          <Route exact path="/" component={Main} />
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup} />
          <Route path="/mypage" exact component={Mypage} />
        </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
