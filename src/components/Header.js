//Library
import React, { useState } from 'react';
import styled from "styled-components";

//Elements
import { Button, Dropdown, Grid, Image, Input, Text, Title } from "../elements/index";

//History
import { history } from "../redux/configStore";

//Components

//임포트 사용 항목 외 삭제요망

const Header = () => {


  return (
    <React.Fragment>
      <Grid is_flex="center" width="100%" height="50px" bg="skyblue"
      style={{position:"fixed", top:0, zIndex:2}}>
        <Text style={{ cursor: "pointer" }}
          clickEvent={() => {
            history.push('/');
          }}>LOGO</Text>
      </Grid>
    </React.Fragment>
  );
};

// const Menu = styled.table`
//   display: flex;
//   width: 100%;
//   padding: 10px;
//   max-width: 800px;
//   margin:auto;
//   position: relative;
//     //styled component use
// `;

export default Header;