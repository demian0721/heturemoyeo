//Library
import React, { useState } from 'react';
import styled from "styled-components";

//Elements
import { AddButton, Button, Dropdown, Grid, LazyImage, Input, Text, Title } from "../elements/index";

//History
import { history } from "../redux/configStore";

//Components

//임포트 사용 항목 외 삭제요망

const Footer = () => {
    
    
    return (
      <React.Fragment>
        <Grid width="100%" height="10vh" bg="skyblue" style={{position:"fixed", bottom:"0",zIndex:"1", minHeight: "70px", maxHeight: "100px", alignItem: "center"}}>
          <Menu>
            <Text hoverWeight='bold' margin="auto" clickEvent={() => { history.push('/'); }} style={{ cursor: "pointer" }}>홈버튼</Text>
            <Text hoverWeight='bold' margin="auto" clickEvent={() => { history.push('/'); }} style={{ cursor: "pointer" }}>모임구하기</Text>
            <Text hoverWeight='bold' margin="auto" clickEvent={() => { history.push('/'); }} style={{ cursor: "pointer" }}>친구관리</Text>
            <Text hoverWeight='bold' margin="auto" clickEvent={() => { history.push('/'); }} style={{ cursor: "pointer" }}>대화방</Text>
            <Text hoverWeight='bold' margin="auto" clickEvent={() => { history.push('/mypage'); }} style={{ cursor: "pointer" }}>마이페이지</Text>
          </Menu>
        </Grid>
      </React.Fragment>
    );
};


<<<<<<< Updated upstream
const Menu = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  max-width: 800px;
  margin:auto;
  position: relative;
  top: 20%;
  //styled component use
=======
const Menu = styled.table`
    width: 100%;
    z-index: 1;
    position: fixed;
    bottom: 0;
    padding: 10px;
    max-width: 800px;
    margin: auto;
    //styled component use
>>>>>>> Stashed changes
`;

export default Footer;