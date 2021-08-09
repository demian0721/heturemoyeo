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
            <Header/>
            <MyPage title='마이페이지' />
            <Footer />
        </React.Fragment>
    );
};

export default Mypage;

