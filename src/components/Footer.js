//Library
import React from 'react';

//Elements
import { Grid, Text } from "../elements/index";

//History
import { history } from "../redux/configStore";

//Components

//임포트 사용 항목 외 삭제요망

const Footer = () => {
    
    
    return (
      <React.Fragment>
        <Grid is_flex="center" width="100%" minWidth="280px" height="77px" bg="#5ac09d"
        style={{position:"fixed", bottom:"0", zIndex:"2"}}>
            <Text hoverWeight='bold' margin="auto"
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
            style={{ cursor: "pointer" }}>마이페이지</Text>
        </Grid>
      </React.Fragment>
    );
};

export default Footer;