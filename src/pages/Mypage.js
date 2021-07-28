//Library
import React, { useState } from 'react';
import styled from "styled-components";

//Elements
import { AddButton, Button, Dropdown, Grid, LazyImage, Input, Text, Title } from "../elements/index";

//History
import { history } from "../redux/configStore";

//Components
import Footer from "../components/Footer";

//임포트 사용 항목 외 삭제요망

const Mypage = () => {
    
    
    return (
        <React.Fragment>
            <Style>동해물과 백두산이 마르고닳도록</Style>
            <Footer></Footer>
        </React.Fragment>
        )
};


const Style = styled.div`
    //styled component use
    background-color: red;
    width: 500px;
`;

export default Mypage;

