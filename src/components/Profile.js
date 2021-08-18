//Library
import React, { useEffect } from 'react';
import styled from "styled-components";

//Elements
import { Button, Grid, Image } from "../elements/index";

//History
import { history } from "../redux/configStore";
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../common/token';

//DB
import { markerActions } from '../redux/modules/marker';
import { userActions } from '../redux/modules/user';

//Components
import Footer from "../components/Footer";

//임포트 사용 항목 외 삭제요망

const Profile = (props) => {
    const userId = props.userId
    const dispatch = useDispatch();
    useEffect(() => { dispatch(markerActions.targetPostDB(userId)) }, []); //{userId}
    useEffect(() => { if (!getToken()) { history.replace('/login'); } }, []);
    const userlist = useSelector(state => state.marker)
    const requestFriends = () => {
      dispatch(userActions.requestFriends({"userId":userId}));
      console.log({"userId":userId})
    }

    return (
        <Style>
      <Grid width="50vw" height="100%" maxWidth="500px" minWidth="250px" margin="auto" style={{}}>
          <Grid width="20vw" maxWidth="150px" minWidth="30px" margin="auto auto 30px" style={{ display: "block", borderRadius: "50%" }}>
            {/* <Image src={userlist.profileImg} /> */}
            <Image src="https://i.imgur.com/ViFAD8Z.png"/>
        </Grid>
        <div style={{ alignItems: "center" }}>
          <Button width="100%" padding="10px" margin="5px auto" display="block" style={{ minWidth: "100px" }}>{userlist.nickname}</Button>
          <Button width="100%" padding="10px" margin="5px auto" display="block" style={{ minWidth: "100px" }}>{userlist.statusMessage}</Button>
          <Button width="100%" padding="10px" margin="5px auto" display="block" hoverColor="false" hoverBg="false" style={{ minWidth: "100px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {userlist.likeItem?.map((l,index) => {
                let idx=index
                return <div key={idx} style={{ margin: "0px 5px", backgroundColor: "#0055FF", color: "white", borderRadius: "5px", padding: "5px" }}>{l}</div>
              })}
            </div>
          </Button>

          { userlist.isFriend ? null : <Button width="100%" padding="10px" margin="15px auto" display="block" style={{ minWidth: "100px" }} onClick={requestFriends}>친구추가</Button> }
          
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

export default Profile;