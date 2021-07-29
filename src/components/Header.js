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
      <Grid is_flex="center" width="100%" minWidth="280px" height="50px" bg="skyblue"
      style={{position:"fixed", top:0, zIndex:2}}>
        <Text hoverWeight='bold'
          clickEvent={() => {history.push('/');}}
          style={{ cursor: "pointer" }}>LOGO</Text>
      </Grid>
    </React.Fragment>
  );
};

export default Header;