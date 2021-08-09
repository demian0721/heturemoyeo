//Library
import React from 'react';

//Elements

//History

//Components
import Footer from "../components/Footer";
import Header from "../components/Header";
import MyPage from "../components/MyPage";

//임포트 사용 항목 외 삭제요망

const Mypage = () => {


    return (
        <React.Fragment>
            <Header>프로필</Header>
            <MyPage/>
            <Footer />
        </React.Fragment>
    );
};

export default Mypage;

