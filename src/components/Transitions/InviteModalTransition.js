import React, { useRef, Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  ShowInviteModal,
  SelectedPostCard,
  MyScheduleList,
} from "../../utils/recoil";
import axios from "../../common/axios";

import useOutsideClick from "../../hooks/useOutsideClick";

const InviteModalTransition = ({ children, markerData }) => {
  // 내 스케쥴 목록을 불러와, MyScheduleList 라는 상태에 저장.
  // useRecoilValue 는 해당 상태에서 값만 가지고 올 수 있는 함수
  const myScheduleList = useRecoilValue(MyScheduleList);
  // invite 모달 표시 상태를 괸리할 수 있는 RecoilState
  const [showInviteModal, setShowInviteModal] = useRecoilState(ShowInviteModal);
  // invite 모달 안에서의 내 스케쥴 목록 아이템을 클릭했을때 해당 클릭한 아이템의 index를 저장하여 상태를 관리할 수 있는 RecoilState
  const [selectedCard, setSelectedCard] = useRecoilState(SelectedPostCard);
  // 내 스케쥴 목록을 모두 불러왔을때, 보여지도록 하는 상태
  const [loaded, setLoaded] = useState(false);
  // 내 스케쥴 목록 RecoilValue가 불러와졌을때, loaded 상태를 true로 변경
  useEffect(() => setLoaded(true), [myScheduleList]);

  const handleModalClose = (clearSelect = true) => {
    setShowInviteModal(false);
    setLoaded(false);
    if (clearSelect) setSelectedCard(0);
  };
  const ref = useRef();
  useOutsideClick(ref, () => handleModalClose());

  const handleModalInvite = (clearSelect = true) => {
    /**
     * filterScheduleList:
     * 내 스케쥴 목록에서 필터링을 합니다.
     * 목록 중에 postId 가 내가 선택한 값과 같은지 여부를 판단하여, 필터링합니다.
     */
    const filterScheduleList = myScheduleList?.filter(
      (el) => el.postId === selectedCard
    );
    // 선택한 값이 없서, 필터링한 목록의 길이가 0 일 경우, 아래에 있는 alert를 띄워준다.
    if (filterScheduleList?.length === 0)
      return alert("초대할 모임을 클릭한 후, 다시 시도해주세요!");
      // 해당 스케쥴의 생성자 아이디와 넘겨받은 마커 데이터 안의 유저 아이디가 같을 경우 아래에 있는 alert를 띄워준다.
    if (filterScheduleList[0].userId === markerData?.userId)
      return alert("나 자신은 초대할 수 없습니다!");
    if (window.confirm("초대시 상대 유저에게 안내 문자가 발송 됩니다.")) {
      axios
        .post(
          "/api/room/invite",
          JSON.stringify({
            userId: Number(markerData?.userId),
            postId: Number(filterScheduleList[0].postId),
          })
        )
        .then((res) => {
          alert("성공적으로 초대되었습니다!");
        })
        .catch((err) => {
          console.log(err);
          switch (err.response.status) {
            case 406:
              alert("이미 초대된 사용자입니다!");
              break;
            default:
              alert("초대하는 도중 오류가 발생하였습니다!");
              break;
          }
        });
      handleModalClose(clearSelect);
    } else {
      return alert("초대가 취소되었습니다.");
    }
  };

  return (
    <Transition show={showInviteModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed lg:mt-40 md:mt-32 mt-20 inset-0 z-10"
        onClose={handleModalClose}
      >
        <div ref={ref} className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed bottom-0 inset-0" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl self-center items-center border border-gray-300 border-opacity-25">
              <Dialog.Title
                as="h3"
                className="text-base font-medium leading-6 text-gray-900"
              >
                모임 초대하기
              </Dialog.Title>
              <div className="mb-2">
                <p className="text-sm text-gray-500">
                  아래 목록에서 원하는 모임에 초대해보세요.
                </p>
              </div>

              <div
                id="my-schedule-list"
                className={`flex flex-wrap flex-initial ${
                  // 내 스케쥴 목록의 길이가 4개와 같거나 클때, overflow-y (스크롤 상하) 를 표시합니다.
                  myScheduleList?.length >= 4
                    ? "overflow-y-scroll"
                    : // 내 스케쥴 목록의 길이가 4개와 같지 않거나 작을때, overflow-y (스크롤 상하) 표시를 숨깁니다.
                      "overflow-hidden"
                } w-full space-y-2 bg-gray-300 rounded-md bg-opacity-25 p-2 border border-gray-400 border-opacity-25 content-start`}
                style={{
                  height: myScheduleList?.length === 0 ? "80px" : "305px",
                }}
              >
                {/* 내 스케쥴 목록의 길이가 0개일 경우, 모임을 생성하라는 아이템을 표시합니다. */}
                {myScheduleList?.length === 0 ? (
                  <div className="flex flex-wrap w-full bg-white selectedCard rounded-md trasition duration-300 ease-in-out shadow-xl self-center px-3 py-2 cursor-pointer text-center justify-center">
                    내가 생성한 모임이 존재하지 않아요!
                    <br />
                    새로운 모임을 생성해보세요!
                  </div>
                ) : (
                  myScheduleList?.map(
                    (
                      el,
                      index // 내 스케쥴 목록의 길이가 0개가 아닐 경우, 내 스케쥴 목록 아이템을 아래에 있는 컴포넌트를 이용하여 아이템을 생성합니다.
                    ) => (
                      <InviteScheduleCard
                        index={index}
                        img={el?.postImg}
                        {...el}
                      />
                    )
                  )
                )}
              </div>
              <div className="flex justify-between mt-4 space-x-4 w-full">
                {loaded && myScheduleList?.length === 0 ? (
                  <>
                    {/* laoded 상태가 true이고 myScheduleList 라는 내 스케뮬 목록의 길이가 0개일 경우, 모임 생성하기 버튼을 생성한다. */}
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 lg:text-sm text-xs font-medium tagItem border border-transparent rounded-md transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      onClick={() => (window.location.href = "/postwrite")}
                    >
                      모임 생성하기
                    </button>
                  </>
                ) : (
                  <>
                    {/* laoded 상태가 true이고 myScheduleList 라는 내 스케뮬 목록의 길이가 0개가 아닐 경우, 모임 초대하기 버튼을 생성한다. */}
                    <button
                      type="button"
                      className="flex justify-center px-4 py-2 lg:text-sm text-xs font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      onClick={handleModalInvite}
                    >
                      모임 초대하기
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 lg:text-sm text-xs font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  onClick={handleModalClose}
                >
                  취소
                </button>
              </div>
            </div>
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            // className="absolute left-0 right-0 w-full h-full bg-black bg-opacity-25"
          >
            <div
              className="fixed left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-25"
              style={{ zIndex: -1 }}
            >
              <span className="sr-only">Overlay</span>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

// 모달 안의 목록 아이템을 만들기 위한 컴포넌트
function InviteScheduleCard({ children, ...props }) {
  const [selectedCard, setSelectedCard] = useRecoilState(SelectedPostCard);
  return (
    <div
      key={props.index}
      id="schedule-card"
      className={`flex flex-wrap w-full ${
        // 선택된 모임 아이디와 map 으로 넘겨받은 모임 아이디와 같을 경우 (삼항 조건 연산자)
        Number(props?.postId) === Number(selectedCard)
          ? "selectedCard"
          : "bg-gray-100 hover:bg-white border border-gray-400 border-opacity-25"
      } rounded-md trasition duration-300 ease-in-out shadow-xl self-center px-3 py-2 cursor-pointer`}
      data-postid={Number(props?.postId)}
      onClick={() => {
        setSelectedCard(Number(props?.postId));
      }}
    >
      <div
        className="block rounded-md w-12 h-12"
        style={{
          textAlign: "center",
          backgroundImage: `url('${
            props?.img ?? "/assets/unknownChatRoomImg.gif"
          }')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          float: "center",
        }}
      >
        <span className="sr-only">post image</span>
      </div>
      <div className="block ml-2 self-center">
        <div id="title" className="lg:text-base text-sm font-bold">
          {props?.title}
        </div>
        <div id="member_count" className="lg:text-sm text-xs font-sm">
          {props?.currentMember}/{props?.maxMember} 명
        </div>
      </div>
    </div>
  );
}

export default InviteModalTransition;
