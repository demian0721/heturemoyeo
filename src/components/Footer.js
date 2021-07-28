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
              <th>홈버튼</th>
              <th>모임구하기</th>
              <th>친구관리</th>
              <th>대화방</th>
              <th>마이페이지</th>
            </tr>
          </thead>
        </Menu>
      </React.Fragment>
    );
};


const Menu = styled.table`
    background-color: skyblue;
    width: 100%;
    z-index: 100;
    position: fixed;
    bottom: 0;
    //styled component use
`;

export default Footer;