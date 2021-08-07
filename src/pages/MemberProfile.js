//Library
import React from 'react';

//Elements

//History

//Components
import Header from "../components/Header";
import Profile from "../components/Profile";

//임포트 사용 항목 외 삭제요망

const MProfile = (props) => {
    const userId = props.match.params.userid;

    return (
        <React.Fragment>
            <Header />
            <Profile userId={userId}/>
        </React.Fragment>
    );
};

export default MProfile;