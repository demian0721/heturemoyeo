//Library
import React from 'react';
import styled from "styled-components";

//Elements

//History

//Components
import Footer from "../components/Footer";
import Header from "../components/Header";
import Page from "../components/Page";

//임포트 사용 항목 외 삭제요망

const Mypage = () => {


    return (
        <React.Fragment>
            <Header />
            <Page />
            <Footer />
        </React.Fragment>
    );
};


const Style = styled.div`
    padding-top:100px;
    align-items: center;
    margin-top: 10vh;
    width: 100vw;
    //styled component use
    /* background-color: red; */
`;

export default Mypage;

