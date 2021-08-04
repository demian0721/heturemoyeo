//LIBRARY
import React from "react";
import styled from "styled-components";
import { css } from "styled-components";
import {useDispatch} from "react-redux";

//ELEMENTS
import { Grid, Input } from "../elements/index";

//COMPONENTS
import Header from "../components/Header";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const title_ref = React.useRef(null);
  const contents_ref = React.useRef(null);
  const starttime_ref = React.useRef(null);
  const endtime_ref = React.useRef(null);
  const bring_ref = React.useRef(null);
  const public_ref = React.useRef(null);
  const tag_ref = React.useRef(null);

  // const addPost = () => {
  //   const post = {
  //     title: title_ref.current.value,
  //     contents: contents_ref.current.value,
  //     starttime: starttime_ref.current.value,
  //     endtime: endtime_ref.current.value,
  //     bring: bring_ref.current.value,
  //     public: public_ref.current.value,
  //     tag: tag_ref.current.value,
  //   };
    
  // dispatch(addBoardFB(post));
  // props.history.replace('/postlist');
  // };

  return (
    <React.Fragment>
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
                  ref={title_ref}
                />
              </div>
              <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="내용"
                  type="text"
                  ref={contents_ref}
                />
              </div>
              <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="시작시간(연도월일)"
                  type="text"
                  ref={starttime_ref}
                />
              </div>
              <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="종료시간(연도월일)"
                  type="text"
                  ref={endtime_ref}
                />
              </div>
          <EnterButton style={{ display: "block" }}>
            <tr>
              <Th>장소(한글 주소로 출력)</Th>
              <Td></Td>
            </tr>
          </EnterButton>
          <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="지참금(문자로 적기)"
                  type="text"
                  ref={bring_ref}
                />
              </div>
              <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="공개여부(전체, 잠금)"
                  type="text"
                  ref={public_ref}
                />
              </div>
              <div>
                <Input
                  margin="7px 0 7px 0"
                  placeholder="태그설정"
                  type="text"
                  ref={tag_ref}
                />
              </div>

          <EnterButton
           >
            <tr>
              <Th>완료</Th>
              <Td></Td>
            </tr>
          </EnterButton>
        </Grid>
      </Grid>
    </React.Fragment>
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