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
  const title = props.title;
  console.log(props)

  return (
    <React.Fragment>
      <Grid is_flex="center" width="100%" minWidth="280px" height="75px" bg="#5ac09d"
      style={{position:"fixed", top:0, zIndex:4}}>
        <div style={{marginTop:"20px"}} onClick={() => { history.push('/')}}>
          {title? <TitleBox>{title}</TitleBox>:<Image src="/assets/logo_header.png"/>} 
          
          
        </div>


      </Grid>
    </React.Fragment>
  );
};

const TitleBox = styled.text`
font-weight: bold;
color: white;
cursor: pointer;
&:hover {
  font-weight: bolder;
}
`;

// Header.defaultProps = {
//   title:'LOGO',
//   clickEvent: () => {history.push('/');},
// };

export default Header;