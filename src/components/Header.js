//Library
import React, { useState } from 'react';
import styled from "styled-components";

//Elements
import { AddButton, Button, Dropdown, Grid, LazyImage, Input, Text, Title } from "../elements/index";

//History
import { history } from "../redux/configStore";

//Components

//임포트 사용 항목 외 삭제요망

const Header = () => {
    
    
    return (
      <React.Fragment>
        <Grid width="100%" height="10vh" bg="skyblue" style={{position:"fixed", top:"0",zIndex:"1", minHeight: "70px", maxHeight: "100px"}}>
          <Menu>
            <Text hoverWeight='bold' margin="auto"  clickEvent={() => { history.push('/'); }} style={{ cursor: "pointer" }}>Header</Text>
          </Menu>
        </Grid>
      </React.Fragment>
    );
};

const Menu = styled.table`
  display: flex;
  width: 100%;
  padding: 10px;
  max-width: 800px;
  margin:auto;
  position: relative;
  top: 20%;
    //styled component use
`;

export default Header;