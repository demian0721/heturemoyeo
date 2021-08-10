/* global kakao */

// LIBRARY
import React, { useRef, useState, useEffect, Fragment } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { geolocated, geoPropTypes } from "react-geolocated";

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
import SearchIcon from "@material-ui/icons/Search";

import useOutsideClick from "../hooks/useOutsideClick";

const PostWrite = (props) => {
  let { postInfo } = props;

  const dispatch = useDispatch();

  const fileInput = useRef();
  const modalRef = useRef();

  const image = useSelector((state) => state.image);
  const preview = !image.preview && props ? props.postImg : image.preview;

  const [height, setHeight] = useState(preview ? "auto" : "380px");

  const [location, setLocation] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  useOutsideClick(modalRef, () => {
    setViewModal(false);
    setIsOpen(false);
  });

  const [postingContents, setPostingContents] = useState({
    title: postInfo ? postInfo.title : "",
    content: postInfo ? postInfo.content : "",
    maxMember: postInfo ? postInfo.maxMember : "",
    startDate: postInfo ? postInfo.startDate : "",
    endDate: postInfo ? postInfo.endDate : "",
    place: postInfo ? postInfo.place : "",
    bring: postInfo ? postInfo.bring : "",
    tag: postInfo ? postInfo.tag : [],
  });

  const isItPossibleToAdd = () => {
    if (
      preview &&
      postingContents.title &&
      postingContents.content &&
      postingContents.maxMember &&
      postingContents.startDate &&
      postingContents.endDate &&
      postingContents.place &&
      postingContents.bring &&
      postingContents.tag.length >= 1
    )
      return true;
    return false;
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

  let kakaoMap

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(
        props?.coords?.latitude,
        props?.coords?.longitude
      ),
      level: 3,
    };
    kakaoMap = new kakao.maps.Map(container, options);
    return () => {};
  }, [isOpen, viewModal, props]);

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
          <div className="flex self-center items-center">
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
            <div
              className="self-center items-center bg-gray-300 cursor-pointer"
              style={{
                paddingTop: "6.5px",
                paddingBottom: "6.5px",
                paddingRight: "3px",
                paddingLeft: "3px",
              }}
              onClick={() => {
                setViewModal(true);
                setIsOpen(true);
              }}
            >
              <SearchIcon />
            </div>
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
                  tag: String(e.target.value).includes(",")
                    ? e.target.value.split(",")
                    : [e.target.value],
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
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto"
          onClose={() => setViewModal(false)}
          ref={modalRef}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  주소 찾기
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    지도를 옮겨 주소를 찾아주세요.
                  </p>
                </div>

                <div id='map w-1 h-1' />

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {
                      setViewModal(false);
                      setIsOpen(false);
                    }}
                  >
                    주소 지정하기
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
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

PostWrite.propTypes = { ...PostWrite.propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: { enableHighAccuracy: false },
  userDecisionTimeout: 500,
})(PostWrite)
