//Library
import React, { useEffect } from 'react';
import styled from "styled-components";

//Material-Ui
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CreateIcon from '@material-ui/icons/Create';

//Elements
import { Button, Grid, Image, Title, Text, Input } from "../elements/index";

//History
import { history } from "../redux/configStore";
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../common/token';

//DB
import { userActions } from '../redux/modules/user';

//Components

//임포트 사용 항목 외 삭제요망

const Seting = () => {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(userActions.myInfoDB()) }, [])

  useEffect(() => { if (!getToken()) { history.replace('/login'); } }, []);

  const userlist = useSelector(state => state.user)
  console.log(userlist)

  return (
    <Style>
      <Grid width="50vw" height="" maxWidth="500px" minWidth="250px"  margin="auto">
        <div style={{ alignItems: "center" }}>
          <Button width="100%" color="#767676" padding="10px 30px" margin="0px 0px 0px 0px" display="block" bg="white" radius='0px' style={{ minWidth: "100px" , justifyContent:'space-between', display:"flex"}}><p>공개범위</p> <ArrowForwardIosIcon style={{width:"15px"}}/></Button>
          <Button width="100%" color="#767676" padding="10px 30px" margin="-1px 0px 0px 0px" display="block" bg="white" radius='0px' style={{ minWidth: "100px", justifyContent:'space-between', display:"flex" }} clickEvent={() => {}}>알림 <ArrowForwardIosIcon style={{width:"15px"}} /></Button>
        </div>
      </Grid>
      
    </Style>
  )
};


const Style = styled.div`
    align-items: center;
    margin-top: 75px;
    width: 100vw;
    height: calc(100vh - 130px);
    background-color: #EFEFEF;
    //styled component use
`;

export default Seting;
