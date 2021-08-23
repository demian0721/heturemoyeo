//Library
import React, { useEffect } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom'

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
  const [statusMessage, setStatus] = React.useState(userlist.statusMessage);

  const changeStatus = (n) => {setStatus(n.target.value);
    console.log(statusMessage)};
    // dispatch(userActions.editStatusMsg({"statusMessage":statusMessage}));

  const editStatusMsg = () => {
    dispatch(userActions.editStatusMsg({"statusMessage":statusMessage}));
  }

  return (
    <Style>
      <Grid  width="100vw" height=""  maxWidth="540px" margin="auto" style={{}}>
        <Grid style={{backgroundColor:"white",borderBottom:"1px solid #dddddd"}}>
            <Grid width="20vw" maxWidth="120px" minWidth="30px" height="20vw" maxHeight="120px" minHeight="30px" margin="40px auto 0px auto" style={{ display: "block", borderRadius: "50%" }}>
              <img style={{width:"20vw", maxWidth:"120px", minWidth:"30px", height:"20vw", maxHeight:"120px", minHeight:"30px"}} src={userlist.profileImg? userlist.profileImg : "/assets/profile_image_avatar_only.png"} /> 
              {/* "https://i.imgur.com/2OeMYtb.png" */}
            </Grid>
            <Grid padding="20px 40px" margin="auto" style={{justifyContent:"center",maxWidth:"500px"}}>
              <Link to="/mypageedit">
                <Grid is_flex margin="auto" style={{justifyContent:"center"}}>
                  <Title style={{ cursor: "default" }}>{userlist.nickname}</Title>
                  <ArrowForwardIosIcon style={{width:"18px"}} />
                </Grid>
              </Link>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {userlist.likeItem?.map((l, index) => {
                  return <div key={index} style={{ margin: "5px 3px", backgroundColor: "#white", color: "#767676", borderRadius: "5px", padding: "3px 5px", fontSize:"small", border:"1px solid #767676"}}>{l}</div>
                })}
              </div>

              <Grid is_flex align='center' margin="auto">
              <button onClick={editStatusMsg} style={{display:"flex"}}>
                <Title fontSize="small" margin="10px 0px 0px 0px" style={{color:"#16C59B"}}>상태메세지</Title>
                <CreateIcon  style={{color:"#767676", fontSize:"20px", marginTop:'7px',wdith:"20px"}} />
              </button>
              </Grid>
              <textarea rows='2' id="status" label="status" value={statusMessage} onChange={changeStatus} style={{outlineStyle:"none", color:'#767676',  width:"100%", maxWidth:"420px", padding:'15px', fontSize:"14px", backgroundColor:"white",border:"1px solid #BEBEBE",resize:"none"}}></textarea>
              {/* <SimpleModal status={userlist.statusMessage} /> */}
            </Grid>
        </Grid>
        
        <Grid width="100vw" height="">
          <div style={{ alignItems: "center" , width:"100vw"}}>
            <Button width="100%" color="#767676" padding="10px 30px" margin="15px 0px 0px 0px" display="block" bg="white" radius='0px' style={{ justifyContent:'space-between', display:"flex", maxWidth:"540px",borderLeft:"1px solid white",borderRight:"1px solid white"}} clickEvent={() => {window.location.href = '/setting'}}><p>설정</p> <ArrowForwardIosIcon style={{width:"15px"}}/></Button>
            <Button width="100%" color="#767676" padding="10px 30px" margin="-1px 0px 0px 0px" display="block" bg="white" radius='0px' style={{ justifyContent:'space-between', display:"flex", maxWidth:"540px",borderLeft:"1px solid white",borderRight:"1px solid white"}} clickEvent={() => {dispatch(userActions.logOut());window.location.href = '/login'}}>로그아웃 <ArrowForwardIosIcon style={{width:"15px"}} onClick={editStatusMsg}/></Button>
          </div>
        </Grid>
      </Grid>
    </Style>
  )
};


const Style = styled.div`
    align-items: center;
    margin-top:75px;
    width: 100vw;
    height: calc(100vh - 130px);
    background-color: #EFEFEF;
    //styled component use
`;

export default MyPage;
