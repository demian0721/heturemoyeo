//LIBRARY
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import {useDispatch} from "react-redux";

// REDUX
import { postActions } from "../redux/modules/post";

//ELEMENTS
import { Grid, Input } from "../elements/index";

//TOKEN
import { getToken } from '../common/token';

// HISTORY
import { history } from '../redux/configStore';

//COMPONENTS
import Header from "../components/Header";
import Permit from '../components/Permit';

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [maxMember, setMaxMember] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [place, setPlace] = useState(null);
  const [bring, setBring] = useState(null);
  const [tag, setTag] = useState(null);
  // const title_ref = React.useRef(null);
  // const content_ref = React.useRef(null);
  // const maxmember_ref = React.useRef(null);
  // const starttime_ref = React.useRef(null);
  // const endtime_ref = React.useRef(null);
  // const place_ref = React.useRef(null);
  // const bring_ref = React.useRef(null);
  // const tag_ref = React.useRef(null);
  
  // const changeTitle = (e) => {
  //   console.log(e.target.value);
  //   setTitle(e.target.value);
  // }
  const addPost = () => {
    // console.log(title, content, maxMember, startDate, endDate, place, bring, tag);
    const post = {
      title: title,
      content: content,
      maxMember: maxMember,
      startDate: startDate,
      endDate: endDate,
      place: place,
      bring: bring,
      tag: tag,
    };

    if (
      title && content && maxMember && startDate && endDate && place && bring && tag
  ) {dispatch(postActions.addPostDB(post));
    props.history.replace('/postlist');}
    else {return window.alert('각 항목은 필수 입력사항 입니다.') }  
  };

  useEffect(() => {
    if (!getToken()) {
        history.replace('/login');
    }
}, []);

  return (
    <Permit>
      <Grid>
        <Header/>
      </Grid>

      <Grid
        width="360px"
        margin="50px auto"
        // padding="55px 40px 100.2px"
        // shadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        tabletStyle={() => {
          return css`
            width: 95%;
          `;
        }}
        mobileStyle={() => {
          return css`
            padding: 15px 20px;
            width: 100%;
          `;
        }}
      >
        <Grid padding="18px" bg="#EFEFEF">
          <EnterButton>
            <tr>
              <Th>모임 대표 이미지 추가 버튼</Th>
              <Td></Td>
            </tr>
          </EnterButton>
             <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="제목"
                  type="text"
                  changeEvent={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="내용"
                  type="text"
                  changeEvent={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </div>
              <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="인원수(명)"
                  type="text"
                  changeEvent={(e) => {
                    setMaxMember(e.target.value);
                  }}
                />
              </div>
              <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="시작시간(연도월일)"
                  type="date"
                  changeEvent={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
              <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="종료시간(연도월일)"
                  type="date"
                  changeEvent={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
              <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="장소(한글 주소로 출력)"
                  type="text"
                  changeEvent={(e) => {
                    setPlace(e.target.value);
                  }}
                />
              </div>
          {/* <EnterButton style={{ display: "block" }}>
            <tr>
              <Th>장소(한글 주소로 출력)</Th>
              <Td></Td>
            </tr>
          </EnterButton> */}
          <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="지참금(문자로 적기)"
                  type="text"
                  changeEvent={(e) => {
                    setBring(e.target.value);
                  }}
                />
              </div>
              <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="태그설정"
                  type="text"
                  changeEvent={(e) => {
                    setTag(e.target.value);
                  }}
                />
              </div>

          <EnterButton
           onClick={addPost}>
            <tr>
              <Th>완료</Th>
              <Td></Td>
            </tr>
          </EnterButton>
        </Grid>
      </Grid>
    </Permit>
  );
};

const Td = styled.td`
  padding-left: 5px;
`;
const Th = styled.th`
  padding-right: 5px;
`;

const EnterButton = styled.button`
  width: 100%;
  background-color: #a7aaad;
  padding: 10px;
  margin: 10px auto;
  font-size: 12px;
  display: flex;
  justify-content: center;
`;

export default PostWrite;