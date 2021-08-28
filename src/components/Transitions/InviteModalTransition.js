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
  const myScheduleList = useRecoilValue(MyScheduleList);
  const [showInviteModal, setShowInviteModal] = useRecoilState(ShowInviteModal);
  const [selectedCard, setSelectedCard] = useRecoilState(SelectedPostCard);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), [myScheduleList]);

  const handleModalClose = (clearSelect = true) => {
    setShowInviteModal(false);
    setLoaded(false);
    if (clearSelect) setSelectedCard(0);
  };
  const ref = useRef();
  useOutsideClick(ref, () => handleModalClose());

  const handleModalInvite = (clearSelect = true) => {
    const filterScheduleList = myScheduleList?.filter(
      (el) => el.postId === selectedCard
    );
    if (filterScheduleList?.length === 0)
      return alert("초대할 모임을 클릭한 후, 다시 시도해주세요!");
    if (filterScheduleList[0].userId === selectedCard)
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
                  myScheduleList?.length >= 4
                    ? "overflow-y-scroll"
                    : "overflow-hidden"
                } w-full space-y-2 bg-gray-300 rounded-md bg-opacity-25 p-2 border border-gray-400 border-opacity-25 content-start`}
                style={{
                  height: myScheduleList?.length === 0 ? "80px" : "305px",
                }}
              >
                {myScheduleList?.length === 0 ? (
                  <div className="flex flex-wrap w-full bg-white selectedCard rounded-md trasition duration-300 ease-in-out shadow-xl self-center px-3 py-2 cursor-pointer text-center justify-center">
                    내가 생성한 모임이 존재하지 않아요!
                    <br />
                    새로운 모임을 생성해보세요!
                  </div>
                ) : (
                  myScheduleList?.map((el, index) => (
                    <InviteScheduleCard
                      index={index}
                      img={el?.postImg}
                      {...el}
                    />
                  ))
                )}
              </div>

              {loaded && myScheduleList?.length === 0 ? (
                <>
                  <div className="flex justify-between mt-4 space-x-4 w-full">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 lg:text-sm text-xs font-medium tagItem border border-transparent rounded-md transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      onClick={() => (window.location.href = "/postwrite")}
                    >
                      모임 생성하기
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 lg:text-sm text-xs font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      onClick={handleModalClose}
                    >
                      취소
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between mt-4 space-x-4 w-full">
                    <button
                      type="button"
                      className="flex justify-center px-4 py-2 lg:text-sm text-xs font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      onClick={handleModalInvite}
                    >
                      모임 초대하기
                    </button>
                    <button
                      type="button"
                      className="flex justify-center px-4 py-2 lg:text-sm text-xs font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      onClick={handleModalClose}
                    >
                      취소
                    </button>
                  </div>
                </>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

function InviteScheduleCard({ children, ...props }) {
  const [selectedCard, setSelectedCard] = useRecoilState(SelectedPostCard);
  return (
    <div
      key={props.index}
      id="schedule-card"
      className={`flex flex-wrap w-full ${
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
