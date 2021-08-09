//Library
import { BorderTop } from '@material-ui/icons';
import React from 'react';

//Elements
import { Grid, Text, Image } from "../elements/index";

//History
import { history } from "../redux/configStore";

//Components

//임포트 사용 항목 외 삭제요망

const Footer = () => {
    
    
    return (
      <React.Fragment>
        <Grid is_flex="center" width="100%" minWidth="280px" height="55px" bg="#FFF"
        style={{position:"fixed", bottom:"0", zIndex:"2", borderTop:"0.4px solid #767676"}}>
            {/* <Text hoverWeight='bold' margin="auto"
            clickEvent={() => { history.push('/'); }}
            style={{ cursor: "pointer" }}>홈버튼</Text>
            <Text hoverWeight='bold' margin="auto"
            clickEvent={() => { history.push('/postlist'); }}
            style={{ cursor: "pointer" }}>모임구하기</Text>
            <Text hoverWeight='bold' margin="auto"
            clickEvent={() => { history.push('/'); }}
            style={{ cursor: "pointer" }}>친구관리</Text>
            <Text hoverWeight='bold' margin="auto"
            clickEvent={() => { history.push('/chat'); }}
            style={{ cursor: "pointer" }}>대화방</Text>
            <Text hoverWeight='bold' margin="auto"
            clickEvent={() => { history.push('/mypage'); }}
            style={{ cursor: "pointer" }}>마이페이지</Text> */}
            <Image id="home0" src="/assets/footer_home.png"/>
            <Image id="group0" src="/assets/footer_search_.png"/>
            <Image id="friend0" src="/assets/footer_friend.png"/>
            <Image id="chat0" src="/assets/footer_messenger.png"/>
            <Image id="profile0" src="/assets/footer_profile.png"/>
        </Grid>
      </React.Fragment>
    );
};

export default Footer;