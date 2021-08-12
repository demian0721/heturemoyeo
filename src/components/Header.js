//Library
import React from 'react';
import styled from 'styled-components';

//Elements
import { Grid, Text, Image } from "../elements/index";

//History
import { history } from "../redux/configStore";

//Image
// import logo_header from '../../public/assets/logo_header';

//임포트 사용 항목 외 삭제요망


const Header = (props) => {
  const title = props.children;

  return (
    <React.Fragment>
      <Grid is_flex="center" width="100%" minWidth="280px" height="75px" bg="#16C59B"
      style={{position:"fixed", top:0, zIndex:4}}>
        <div style={{marginTop:"20px"}} onClick={() => { window.location.href='/'}}>
          {title==''? <Image src="/assets/logo_header.png"/>:<TitleBox>{title}</TitleBox>} 
          
          
        </div>


      </Grid>
    </React.Fragment>
  );
};

const TitleBox = styled.text`
font-weight: bold;
color: white;
cursor: pointer;
font-size: 16px;
&:hover {
  font-weight: bolder;
}
`;

Header.defaultProps = {
  children:"",
  // clickEvent: () => {history.push('/');},
};

export default Header;