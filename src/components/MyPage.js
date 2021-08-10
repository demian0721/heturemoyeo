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
import SimpleModal from "./Mymodal";

//임포트 사용 항목 외 삭제요망

const MyPage = () => {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(userActions.myInfoDB()) }, [])

  useEffect(() => { if (!getToken()) { history.replace('/login'); } }, []);

  const userlist = useSelector(state => state.user)
  console.log(userlist)
  const [statusMessage, setStatus] = React.useState(userlist.status);

  const changeStatus = (n) => {setStatus(n.target.value);
    console.log(statusMessage)};
    // dispatch(userActions.editStatusMsg({"statusMessage":statusMessage}));

  const editStatusMsg = () => {
    dispatch(userActions.editStatusMsg({"statusMessage":statusMessage}));
  }

  return (
    <Style>
      <Grid width="50vw" height="" maxWidth="500px" minWidth="250px" margin="auto" style={{backgroundColor:"white",borderBottom:"1px solid #dddddd"}}>
          <Grid width="20vw" maxWidth="120px" minWidth="30px" margin="40px auto 0px auto" style={{ display: "block", borderRadius: "50%" }}>
            <Image src={userlist.profileImg? userlist.profileImg : "/assets/profile_image_avatar_only.png"} /> 
            {/* "https://i.imgur.com/2OeMYtb.png" */}
          </Grid>
          <Grid padding="20px 40px">
            <Grid is_flex margin="auto" style={{justifyContent:"center"}}>
              <Title onClick={() => { history.push('/mypageedit'); }} style={{ cursor: "default" }}>{userlist.nickname}</Title>
              <ArrowForwardIosIcon style={{width:"18px"}} onClick={() => { history.push('/mypageedit'); }} />
            </Grid>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {userlist.likeItem?.map((l) => {
                return <div style={{ margin: "5px 3px", backgroundColor: "#white", color: "#767676", borderRadius: "5px", padding: "3px 5px", fontSize:"small", border:"1px solid #767676"}}>{l}</div>
              })}
            </div>

            <Grid is_flex align='center' >
            <Title fontSize="small" margin="10px 0px 0px 0px" style={{color:"#16C59B"}}>상태메세지</Title>
            <CreateIcon  style={{color:"#767676", fontSize:"12px", marginTop:'7px'}} onClick={editStatusMsg} />
            </Grid>
            <textarea rows='2' id="status" label="status" value={statusMessage} onChange={changeStatus} style={{outlineStyle:"none", color:'#767676',  width:"100%", padding:'15px', fontSize:"14px", backgroundColor:"rgba(22, 197, 155,0.08)"}}></textarea>
            {/* <SimpleModal status={userlist.statusMessage} /> */}
          </Grid>
      </Grid>
      
      <Grid width="50vw" height="" maxWidth="500px" minWidth="250px"  margin="auto">
        <div style={{ alignItems: "center" }}>
          <Button width="100%" color="#767676" padding="10px 30px" margin="15px 0px 0px 0px" display="block" bg="white" radius='0px' style={{ minWidth: "100px" , justifyContent:'space-between', display:"flex"}} clickEvent={() => {window.location.href = '/setting'}}><p>설정</p> <ArrowForwardIosIcon style={{width:"15px"}}/></Button>
          <Button width="100%" color="#767676" padding="10px 30px" margin="-1px 0px 0px 0px" display="block" bg="white" radius='0px' style={{ minWidth: "100px", justifyContent:'space-between', display:"flex" }} clickEvent={() => {
            dispatch(userActions.logOut());
            window.location.href = '/login'
          }}>로그아웃 <ArrowForwardIosIcon style={{width:"15px"}} onClick={editStatusMsg}/></Button>
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
