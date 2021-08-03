//Library
import React, { useEffect } from 'react';
import styled from "styled-components";

//Material-Ui
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//Elements
import { Button, Grid, Image, Title, Text } from "../elements/index";

//History
import { history } from "../redux/configStore";
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../common/token';

//DB
import { userActions } from '../redux/modules/user';

//Components
import SimpleModal from "./Mymodal";

//임포트 사용 항목 외 삭제요망

const Page = () => {
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
      <Grid width="50vw" height="100%" maxWidth="500px" minWidth="250px" margin="auto" style={{}}>
        <Grid id="profile" is_flex>
          <Grid width="20vw" maxWidth="150px" minWidth="30px" margin="auto auto 30px" style={{ display: "block", borderRadius: "50%" }}>
            <Image src={userlist.profileImg} />
          </Grid>
          <Grid padding="20px">
            <Grid is_flex>
              <Title onClick={() => { history.push('/mypageedit'); }} style={{ cursor: "default" }}>{userlist.nickname}</Title>
              <ArrowForwardIosIcon onClick={() => { history.push('/mypageedit'); }} />
            </Grid>
            <SimpleModal status={userlist.statusMessage} />
          </Grid>
        </Grid>
        <div style={{ alignItems: "center" }}>
          <Button width="100%" padding="10px" margin="5px auto" display="block" style={{ minWidth: "100px" }}>내 모임들</Button>
          <Button width="100%" padding="10px" margin="5px auto" display="block" hoverColor="false" hoverBg="false" style={{ minWidth: "100px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {userlist.likeItem?.map((l) => {
                return <div style={{ margin: "0px 5px", backgroundColor: "#0055FF", color: "white", borderRadius: "5px", padding: "5px" }}>{l}</div>
              })}
            </div>
          </Button>
          <Button width="100%" padding="10px" margin="5px auto" display="block" style={{ minWidth: "100px" }}>설정</Button>
          <Button width="100%" padding="10px" margin="5px auto" display="block" style={{ minWidth: "100px" }} clickEvent={() => {
            dispatch(userActions.logOut());
            window.location.href = '/login'
          }}>로그아웃</Button>
        </div>
      </Grid>


    </Style>
  )
};


const Style = styled.div`
    align-items: center;
    margin-top: 15vh;
    width: 100vw;
    //styled component use
`;

export default Page;
