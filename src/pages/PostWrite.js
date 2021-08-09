// LIBRARY
import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// TOKEN
import { getToken } from "../common/token";

// HISTORY
import { history } from "../redux/configStore";

// REDUX
import { imgActions } from "../redux/modules/image";
import { postActions } from "../redux/modules/post";

// COMPONENTS
import Header from "../components/Header";
import Permit from "../components/Permit";

// ELEMENTS
import { Grid, Input, Image } from "../elements/index";

// ICON
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";

const PostWrite = (props) => {
  let { postInfo } = props;

  const dispatch = useDispatch();

  const fileInput = useRef();

  const image = useSelector((state) => state.image);
  const preview = !image.preview && props ? props.postImg : image.preview;

  const [height, setHeight] = useState(preview ? "auto" : "380px");

  const [postingContents, setPostingContents] = useState({
    title: postInfo ? postInfo.title : "",
    content: postInfo ? postInfo.content : "",
    maxMember: postInfo ? postInfo.maxMember : "",
    startDate: postInfo ? postInfo.startDate : "",
    endDate: postInfo ? postInfo.endDate : "",
    place: postInfo ? postInfo.place : "",
    bring: postInfo ? postInfo.bring : "",
    tag: postInfo ? postInfo.tag : ["", ""],
  });

  const isItPossibleToAdd = () => {
    if (
      !(
        preview &&
        postingContents.title &&
        postingContents.content &&
        postingContents.maxMember &&
        postingContents.startDate &&
        postingContents.endDate &&
        postingContents.place &&
        postingContents.bring &&
        postingContents.tag.split(",")
      )
    ) {
      return false;
    }

    return true;
  };

  const addPost = () => {
    const isAvailable = isItPossibleToAdd();

    if (!isAvailable) {
      window.alert("각 항목은 필수 입력사항 입니다.");
      return;
    }

    dispatch(
      postActions.addPostDB(fileInput.current.files[0], postingContents)
    );
    dispatch(imgActions.setPreview(null));
    props.history.replace("/postlist");
  };

  const selectFile = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (file) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        dispatch(imgActions.setPreview(reader.result));
        setHeight("auto");
      };
    }
  };

  useEffect(() => {
    if (!getToken()) {
      history.replace("/login");
    }
  }, []);

  return (
    <Permit>
      <Grid>
        <Header>게시글 작성</Header>
      </Grid>

      <Grid
        width="360px"
        margin="50px auto"
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
          <Grid
            width="320px"
            margin="0 30px 0 0"
            tabletStyle={() => {
              return css`
                margin: 0 auto;
              `;
            }}
          >
            <Grid
              bg="#EFEFEF"
              radius="10px"
              style={{ height: `${height}`, position: "relative" }}
            >
              <LabelStyle htmlFor="input--file">
                {!preview ? (
                  <>
                    <InsertPhotoIcon />
                    이미지 추가
                  </>
                ) : null}
              </LabelStyle>

              <InputFile
                type="file"
                id="input--file"
                ref={fileInput}
                accept="image/png, image/jpeg"
                onChange={selectFile}
              />

              <Image
                style={{ position: "absolute", left: 0, top: 0 }}
                src={preview}
              />
            </Grid>
          </Grid>
          <div>
            <Input
              margin="7px 0 7px 0"
              placeholder="제목"
              type="text"
              changeEvent={(e) => {
                setPostingContents({
                  ...postingContents,
                  title: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <Input
              margin="7px 0 7px 0"
              placeholder="내용"
              type="text"
              changeEvent={(e) => {
                setPostingContents({
                  ...postingContents,
                  content: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <Input
              margin="7px 0 7px 0"
              placeholder="인원수(명)"
              changeEvent={(e) => {
                setPostingContents({
                  ...postingContents,
                  maxMember: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <Input
              margin="7px 0 7px 0"
              placeholder="시작시간(연도월일)"
              type="date"
              changeEvent={(e) => {
                setPostingContents({
                  ...postingContents,
                  startDate: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <Input
              margin="7px 0 7px 0"
              placeholder="종료시간(연도월일)"
              type="date"
              changeEvent={(e) => {
                setPostingContents({
                  ...postingContents,
                  endDate: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <Input
              margin="7px 0 7px 0"
              placeholder="장소(한글 주소로 출력)"
              type="text"
              changeEvent={(e) => {
                setPostingContents({
                  ...postingContents,
                  place: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <Input
              margin="7px 0 7px 0"
              placeholder="지참금(문자로 적기)"
              type="text"
              changeEvent={(e) => {
                setPostingContents({
                  ...postingContents,
                  bring: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <Input
              margin="7px 0 7px 0"
              placeholder="태그설정"
              type="text"
              changeEvent={(e) => {
                setPostingContents({
                  ...postingContents,
                  tag: e.target.value,
                });
              }}
            />
          </div>

          <EnterButton onClick={addPost}>
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

const PosAbs = () => {
  return css`
    position: absolute;
    top: 0;
    left: 0;
  `;
};

const LabelStyle = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 20px;
  box-sizing: border-box;
  ${PosAbs()};
  z-index: 3;
`;

const InputFile = styled.input`
  width: 1px;
  height: 1px;
  overflow: hidden;
  ${PosAbs()};
`;

const InputArea = styled.textarea`
  --lightcolor: #6c757d;

  width: 100%;
  height: 158px;
  resize: none;
  padding: 8px 15px;
  margin-bottom: 30px;
  border-radius: 20px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 16px;

  &:focus {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px inset;
    outline: none;
    border: none;
  }

  &::placeholder {
    color: var(--lightcolor);
  }

  &::-webkit-input-placeholder {
    color: var(--lightcolor);
  }

  &:-ms-input-placeholder {
    color: var(--lightcolor);
  }
`;
export default PostWrite;
