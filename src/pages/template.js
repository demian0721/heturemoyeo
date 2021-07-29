// LIBRARY
import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import styled from "styled-components";

// HISTORY
import { history } from './redux/configStore';

// REDUX
import { userActions } from './redux/modules/user';
import { useDispatch } from 'react-redux';

// TOKEN
import { getToken } from './common/token';

// STYLE
import GlobalStyle from './common/globalStyle';

// ELEMENTS

// COMMON

// COPONENTS

// PAGES
import { Main, Login, Signup, SignupInfo, Mypage, MypageEdit } from './pages/index';

//임포트 사용 항목 외 삭제요망

const Template = () => {
    
    
    return (
        <React.Fragment>
        
        </React.Fragment>
        )
};


const Style = styled.div`
    //styled component use
`;

export default Template;