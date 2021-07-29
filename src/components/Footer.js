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
      </React.Fragment>
    );
};


const Menu = styled.table`
    background-color: skyblue;
    width: 100%;
    z-index: 1;
    position: fixed;
    bottom: 0;
    padding: 10pxg;
    //styled component use
`;

export default Footer;