//Library
import React, { useEffect } from 'react';
import styled from "styled-components";

//Material-Ui
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//Elements
import { Button, Grid, Image, Title, Text, Input } from "../elements/index";

//History
import { history } from "../redux/configStore";
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../common/token';

//DB
import { userActions } from '../redux/modules/user';

//Components
import SimpleModal from "./Mymodal";

//임포트 사용 항목 외 삭제요망

const MyPage = () => {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(userActions.myInfoDB()) }, [])

  useEffect(() => { if (!getToken()) { history.replace('/login'); } }, []);
  // const is_login = useSelector((state)=>state.user.is_login);

  // if(!is_login){
  //   <Grid>
  //     <Text>로그인 후, 글을 작성할 수 있습니다.</Text>
  //     <Button clickEvent={() => { history.replace('/login'); }}>로그인하러 가기</Button>
  //   </Grid>
  // }

  // const userlist = 
  const userlist = useSelector(state => state.user)

  return (
    <Style>
      <Grid width="50vw" height="" maxWidth="500px" minWidth="250px" margin="auto" style={{backgroundColor:"white"}}>
          <Grid width="20vw" maxWidth="120px" minWidth="30px" margin="40px auto 0px auto" style={{ display: "block", borderRadius: "50%" }}>
            <Image src="https://i.imgur.com/2OeMYtb.png" /> 
            {/* {userlist.profileImg} */}
          </Grid>
          <Grid padding="20px">
            <Grid is_flex margin="auto" style={{justifyContent:"center"}}>
              <Title onClick={() => { history.push('/mypageedit'); }} style={{ cursor: "default" }}>{userlist.nickname}</Title>
              <ArrowForwardIosIcon style={{width:"18px"}} onClick={() => { history.push('/mypageedit'); }} />
            </Grid>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {userlist.likeItem?.map((l) => {
                return <div style={{ margin: "5px 3px", backgroundColor: "#white", color: "#767676", borderRadius: "5px", padding: "3px 5px", fontSize:"small", border:"1px solid #767676"}}>{l}</div>
              })}
            </div>

            <Title fontSize="small" margin="10px 0px 0px 0px" style={{color:"#16C59B"}}>상태메세지</Title>
            <textarea rows='2' value={userlist.statusMessage} style={{color:'#767676', border:"solid 1px #BEBEBE", width:"100%", padding:'15px', fontSize:"14px"}}></textarea>
            {/* <SimpleModal status={userlist.statusMessage} /> */}
          </Grid>
      </Grid>
      
      <Grid width="50vw" height="" maxWidth="500px" minWidth="250px"  margin="auto">
        <div style={{ alignItems: "center" }}>
          <Button width="100%" padding="10px" margin="25px 0px 0px 0px" display="block" bg="white" style={{ minWidth: "100px", justifyContent:'space-between'}}>내 모임들 <ArrowForwardIosIcon style={{width:"15px"}}/></Button>
          <Button width="100%" padding="10px" margin="-1px 0px 0px 0px" display="block" bg="white" style={{ minWidth: "100px" , justifyContent:'space-between'}}>설정 <ArrowForwardIosIcon style={{width:"15px"}}/></Button>
          <Button width="100%" padding="10px" margin="-1px 0px 0px 0px" display="block" bg="white" style={{ minWidth: "100px", justifyContent:'space-between' }} clickEvent={() => {
            dispatch(userActions.logOut());
            window.location.href = '/login'
          }}>로그아웃 <ArrowForwardIosIcon style={{width:"15px"}}/></Button>
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

export default MyPage;
