//Library
import React, { useEffect } from 'react';

//Elements

//History
import { useSelector, useDispatch } from 'react-redux';

//Components
import Footer from "../components/Footer";
import Header from "../components/Header";
import MyPage from "../components/MyPage";
//DB
import { userActions } from '../redux/modules/user';
//임포트 사용 항목 외 삭제요망

const Mypage = () => {
    const dispatch = useDispatch();

    useEffect(() => { dispatch(userActions.myInfoDB()) }, [])
    const userlist = useSelector(state => state.user);
    const is_loaded = useSelector((state) => state.user.is_loaded);

    return (
        <React.Fragment>
            <Header>프로필</Header>
            {is_loaded && <MyPage userlist={userlist}/>}
            <Footer>profile</Footer>
        </React.Fragment>
    );
};

export default Mypage;

