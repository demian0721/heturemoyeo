//Library
import React, { useEffect } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom'

//Material-Ui
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CreateIcon from '@material-ui/icons/Create';

//Elements
import { Button, Grid, Title } from "../elements/index";

//History
import { history } from "../redux/configStore";
import { getToken } from '../common/token';
import { useDispatch } from 'react-redux';

//DB
import { userActions } from '../redux/modules/user';

//임포트 사용 항목 외 삭제요망

const MyPage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => { if (!getToken()) { history.replace('/login'); } }, []);
  const userlist = props.userlist;
  const [statusMessage, setStatus] = React.useState(userlist.statusMessage);
  
  const changeStatus = (n) => {setStatus(n.target.value);};


  return (
    <Style>
      <Grid  width="100vw" height=""  maxWidth="540px" margin="auto" style={{}}>
        <Grid style={{backgroundColor:"white",borderBottom:"1px solid #dddddd"}}>
            <Grid width="20vw" maxWidth="120px" minWidth="30px" height="20vw" maxHeight="120px" minHeight="30px" margin="40px auto 0px auto" style={{ display: "block", borderRadius: "50%" }}>
              <img style={{width:"20vw", maxWidth:"120px", minWidth:"30px", height:"20vw", maxHeight:"120px", minHeight:"30px"}} src={userlist.profileImg? userlist.profileImg : "/assets/profile_image_avatar_only.png"} /> 
            </Grid>
            <Grid padding="20px 40px" margin="auto" style={{justifyContent:"center",maxWidth:"500px"}}>
              <Link to="/mypageedit">
                <Grid is_flex margin="auto" style={{justifyContent:"center"}}>
                  <Title style={{ cursor: "default" }}>{userlist.nickname}</Title>
                  <ArrowForwardIosIcon style={{width:"18px"}} />
                </Grid>
              </Link>
              <div  className="font-normal text-xs py-1 lg:text-sm space-x-1" style={{textAlign:"center"}}>
                {userlist.likeItem?.map((l, index) => {
                  return <div key={index} style={{ margin: "3px", backgroundColor: "#white", color: "#767676", borderRadius: "5px", padding: "3px 5px", fontSize:"small", border:"1px solid #767676"}} className="inline-flex">{l}</div>
                })}
              </div>

              <Grid is_flex align='center' margin="auto">
              <button onClick={() => {
                  dispatch(userActions.editStatusMsg({"statusMessage":statusMessage}));
                }} style={{display:"flex"}}>
                <Title fontSize="small" margin="10px 0px 0px 0px" style={{color:"#16C59B"}}>상태메세지</Title>
                <CreateIcon  style={{color:"#767676", fontSize:"20px", marginTop:'7px',wdith:"20px"}} />
              </button>
              </Grid>
              <textarea rows='2' id="status" label="status" value={statusMessage} onChange={changeStatus} style={{outlineStyle:"none", color:'#767676',  width:"100%", maxWidth:"420px", padding:'15px', fontSize:"14px", backgroundColor:"white",border:"1px solid #BEBEBE",resize:"none"}}></textarea>
            </Grid>
        </Grid>
        
        <Grid width="100vw" height="">
          <div style={{ alignItems: "center" , width:"100vw",margin:"15px 0px 0px 0px"}}>
            {/* <Button width="100%" color="#767676" padding="10px 30px" margin="-1px 0px 0px 0px" display="block" bg="white" radius='0px' style={{ justifyContent:'space-between', display:"flex", maxWidth:"540px",borderLeft:"1px solid white",borderRight:"1px solid white"}} clickEvent={() => {window.location.href = '/setting'}}><p>설정</p> <ArrowForwardIosIcon style={{width:"15px"}}/></Button> */}
            <Button width="100%" color="#767676" padding="10px 30px" margin="-1px 0px 0px 0px" display="block" bg="white" radius='0px' style={{ justifyContent:'space-between', display:"flex", maxWidth:"540px",borderLeft:"1px solid white",borderRight:"1px solid white"}} clickEvent={() => {window.open('https://forms.gle/j2pyniivrJgxcn7G8')}}><p>고객의견</p> <ArrowForwardIosIcon style={{width:"15px"}}/></Button>
            <Button width="100%" color="#767676" padding="10px 30px" margin="-1px 0px 0px 0px" display="block" bg="white" radius='0px' style={{ justifyContent:'space-between', display:"flex", maxWidth:"540px",borderLeft:"1px solid white",borderRight:"1px solid white"}} clickEvent={() => {dispatch(userActions.logOut());window.location.href = '/login'}}>로그아웃 <ArrowForwardIosIcon style={{width:"15px"}}/></Button>
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
