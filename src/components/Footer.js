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
        <Grid width="100%" height="10vh" bg="skyblue" style={{position:"fixed", bottom:"0",zIndex:"100", minHeight: "70px", maxHeight: "100px"}}>
          <Menu>
            <thead>
              <tr>
                <th><Text clickEvent={() => { history.push('/'); }} style={{ cursor: "pointer" }}>홈버튼</Text></th>
                <th><Text clickEvent={() => { history.push('/'); }} style={{ cursor: "pointer" }}>모임구하기</Text></th>
                <th><Text clickEvent={() => { history.push('/'); }} style={{ cursor: "pointer" }}>친구관리</Text></th>
                <th><Text clickEvent={() => { history.push('/'); }} style={{ cursor: "pointer" }}>대화방</Text></th>
                <th><Text clickEvent={() => { history.push('/mypage'); }} style={{ cursor: "pointer" }}>마이페이지</Text></th>
              </tr>
            </thead>
          </Menu>
        </Grid>
      </React.Fragment>
    );
};


const Menu = styled.table`
    width: 100%;
<<<<<<< Updated upstream
    z-index: 1;
    position: fixed;
    bottom: 0;
    padding: 10pxg;
=======
    padding: 10px;
    max-width: 800px;
    margin: auto;
>>>>>>> Stashed changes
    //styled component use
`;

export default Footer;