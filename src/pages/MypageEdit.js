//Library
import React, { useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

//Elements

//History
import { userActions } from '../redux/modules/user';

//Components
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProfileEdit from "../components/ProfileEdit";

//임포트 사용 항목 외 삭제요망

const MypageEdit = () => {
    const dispatch = useDispatch();
    useEffect(() => {dispatch(userActions.myInfoDB()) }, [])
    const userlist = useSelector(state => state.user)
    const is_loaded = useSelector((state) => state.user.is_loaded);

    return (
        <React.Fragment>
            <Header>회원정보 수정</Header>
            {is_loaded && <ProfileEdit userinfo={userlist}/>}
            <Footer>profile</Footer>
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

export default MypageEdit;

