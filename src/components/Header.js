//Library
import React from 'react';

//Elements
import { Grid, Text } from "../elements/index";

//History
import { history } from "../redux/configStore";

//Components

//임포트 사용 항목 외 삭제요망

const Header = () => {


  return (
    <React.Fragment>
      <Grid is_flex="center" width="100%" minWidth="280px" height="50px" bg="#5ac09d"
      style={{position:"fixed", top:0, zIndex:4}}>
        <Text hoverWeight='bold'
          clickEvent={() => {history.push('/');}}
          style={{ cursor: "pointer" }}>LOGO</Text>
      </Grid>
    </React.Fragment>
  );
};

export default Header;