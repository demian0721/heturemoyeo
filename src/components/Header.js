//Library
import React from "react";
import styled from "styled-components";

//Elements
import { Grid, Text, Image } from "../elements/index";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

//History
import { history } from "../redux/configStore";

//Image
// import logo_header from '../../public/assets/logo_header';

//임포트 사용 항목 외 삭제요망

const Header = (props) => {
  const title = props.children;
  const id = props.id;
  const width = props.width;
  
  console.log('test',id)
  return (
    <React.Fragment>
      <Grid
        is_flex="center"
        minWidth="280px"
        height="75px"
        bg="#16C59B"
        padding="20px"
        width={width}
        style={{ position: "fixed", top: 0, zIndex: 4, justifyContent:"space-between"}}
      >
        {id == "chatroom" ? <ArrowBackOutlinedIcon  style={{color:"white"}}/> : <div></div> }
        {title == "" ? (<div id="header" onClick={() => {window.location.href = "/";}}>
          <Image src="/assets/logo_header.png" /></div>) : (<TitleBox style={{cursor:"default"}}>{title}</TitleBox>)}
        <Grid width="">
          {id == "chatroom" ? <MoreHorizIcon style={{color:"white"}}/> : null }
          {id == "detail" ? <Text color="white">삭제</Text> : null }
          {id == "write" ? <Text color="white">게시</Text> : null }
          {id =="" ? <div></div> : null}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const TitleBox = styled.text`
  font-weight: bold;
  color: white;
  /* cursor: pointer; */
  font-size: 16px;
  &:hover {
    font-weight: bolder;
  }
`;

Header.defaultProps = {
  children: "",
  id:"",
  width:"100%",
  // clickEvent: () => {history.push('/');},
};

export default Header;
