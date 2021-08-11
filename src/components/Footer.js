//Library
import { BorderTop } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';

//Elements
import { Grid, Text, Image, Button } from "../elements/index";

//History
import { history } from "../redux/configStore";

//Components

//임포트 사용 항목 외 삭제요망

const Footer = (props) => {
  const title = props.children;

  //스테이트로 호버 시도하다 실패함
  const [homeSrc, setHome] =React.useState("http://dummyimage.com/100x100/000/fff");
  const hover=()=> {setHome('http://dummyimage.com/100x100/eb00eb/fff');}
  const unhover=()=> {setHome("http://dummyimage.com/100x100/000/fff");}
    

    return (
      <React.Fragment>
        <Grid is_flex="center" width="100%" minWidth="280px" height="55px" bg="#FFF"
        style={{position:"fixed", bottom:"0", zIndex:"2", borderTop:"0.4px solid #767676"}}>
          {title=='home'? <Image id="home0" src="/assets/footer_select_home.png" clickEvent={() => { history.push('/'); }}/> : <Image id="home0" src="/assets/footer_home.png" clickEvent={() => { history.push('/'); }}/>}
          {title=='group'? <Image id="group0" src="/assets/footer_select_search.png" clickEvent={() => { history.push('/postlist'); }}/> : <Image id="group0" src="/assets/footer_search.png" clickEvent={() => { history.push('/postlist'); }}/>}
          {title=='friend'? <Image id="friend0" src="/assets/footer_select_friend.png" clickEvent={() => { history.push('/'); }}/> : <Image id="friend0" src="/assets/footer_friend.png" clickEvent={() => { history.push('/'); }}/>}
          {title=='chat'? <Image id="chat0" src="/assets/footer_select_messenger.png" clickEvent={() => { history.push('/chat'); }}/> : <Image id="chat0" src="/assets/footer_messenger.png" clickEvent={() => { history.push('/chat'); }}/>}
          {title=='profile'? <Image id="profile0" src="/assets/footer_select_profile.png" clickEvent={() => { history.push('/mypage'); }}/> : <Image id="profile0" src="/assets/footer_profile.png" clickEvent={() => { history.push('/mypage'); }}/>}
         
          <Home></Home>
          {/* <img id="my-img" src={homeSrc} onmouseover={hover} onmouseout={unhover} />
          <button onClick={() => { history.push('/'); }}><Image id="home0" src="/assets/footer_home.png" /></button> */}

        </Grid>
      </React.Fragment>
    );
};

 //스타일디브로 호버 시도하다 실패함
const Home = styled.button`
width: '75px';
height: '55px';
/* background-image: url(/assets/footer_home.png); */
&:hover {
  font-weight: bolder;
  /* background-image: "/assets/footer_select_home.png"; */
}
`;
const Hom = styled.img`
src: "/assets/footer_home.png";
`;

Footer.defaultProps = {
  children:"",
  // clickEvent: () => {history.push('/');},
};

export default Footer;