import React, { useRef, Fragment, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";

import { useRecoilState } from "recoil";
import { DistanceState, ShowDistanceModal } from "../../utils/recoil";
import useOutsideClick from "../../hooks/useOutsideClick";
import Logger from "../../utils/Logger";
import socket from "../../common/socket";

const DistanceModalTransition = ({ children }) => {
  // DistanceState의 기본값 = 2000
  const [selectedDistance, setSelectedDistance] = useRecoilState(DistanceState);

  /**
   * Distance 기본 값 설정하기:
   * 만약 처음 이용하는 사용자이거나, 설정한 Distance Recoil 값이 다를 경우, 해당 값으로 변경하며 socket 에 해당 값을 전송한다.
   */
  useEffect(() => {
    const getDistance = localStorage.getItem("distance");
    if (!getDistance) {
      setSelectedDistance(2000);
      localStorage.setItem("distance", 2000);
      socket.emit("changeDistance", { distance: 2000 });
      return Logger.info(
        `[SetDefaultDistance] Init to set localStorage item via getDistance (DefaultDistance: 2000M (2KM))`
      );
    }
    if (Number(getDistance) !== Number(selectedDistance)) {
      setSelectedDistance(Number(getDistance));
      socket.emit("changeDistance", { distance: Number(getDistance) });
      return Logger.info(
        `[SetDistance] Not same to reocil distance, but set distance... (SetDistance: ${Number(
          getDistance
        )}M (${Number(getDistance) / 1000}KM))`
      );
    }
  }, []);

  // DistanceList: 볼 수 있는 반경 거리를 KM 로 표현하여 Array에 넣어둔 것.
  const distanceList = [2, 5, 10, 15, 700];
  // Distance 모달의 표시 상태를 관리할 수 있는 RecoilState
  const [showDistance, setShowDistance] = useRecoilState(ShowDistanceModal);
  const ref = useRef();
  const handleDistanceClose = (clearSelect = true) => {
    setShowDistance(false);
    if (clearSelect) setSelectedDistance(DistanceState);
  };
  useOutsideClick(ref, () => handleDistanceClose(false));
  const handleChangeDistance = (clearSelect = true) => {
    const getDistance = localStorage.getItem("distance");
    if (Number(selectedDistance) === Number(getDistance))
      return alert("현재 설정된 반경과 동일합니다!");
    alert(
      `보기 반경이 ${getDistance / 1000 ?? "알 수 없음"}KM 에서 ${
        Number(selectedDistance) / 1000
      }KM로 변경되었습니다!`
    );
    localStorage.setItem("distance", Number(selectedDistance));
    socket.emit("changeDistance", { distance: Number(selectedDistance) });
    handleDistanceClose(clearSelect);
  };

  return (
    <Transition show={showDistance} as={Fragment}>
      <Dialog
        as="div"
        className="fixed lg:mt-40 md:mt-32 mt-20 inset-0 z-10"
        onClose={() => handleDistanceClose(false)}
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
                범위 설정하기
              </Dialog.Title>
              <div className="mb-2">
                <p className="text-sm text-gray-500">
                  원하는 반경 거리를 선택하여 확인하여보세요.
                </p>
              </div>

              <div
                className="flex flex-wrap flex-initial overflow-y-scroll w-full space-y-2 bg-gray-300 rounded-md bg-opacity-25 p-2 border border-gray-400 border-opacity-25 content-start"
                style={{ height: "305px" }}
              >
                {/* 아래 컴포넌트를 이용하여 목록 아이템을 생성함. */}
                {distanceList.map((radius, index) => {
                  const props = { radius, index };
                  return <DistanceCard {...props} />;
                })}
              </div>
              <div className="flex justify-between mt-4 space-x-4 w-full">
                <button
                  type="button"
                  className="flex justify-center px-4 py-2 lg:text-sm text-xs font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  onClick={() => handleChangeDistance(false)}
                >
                  설정하기
                </button>
                <button
                  type="button"
                  className="flex justify-center px-4 py-2 lg:text-sm text-xs font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  onClick={() => handleDistanceClose(false)}
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

/**
 * DistanceCard Component:
 * 모달 안에 목록 아이템을 만들어주기 위한 컴포넌트
 * 해당 컴포넌트를 이용하여 MAP 함수를 써서 정해진 모달 안에
 * 순차적으로 넣을 수 있음.
 * 
 * distanceList.map((el, index) => ...)
 */
function DistanceCard({ children, ...props }) {
  const [selectedDistance, setSelectedDistance] = useRecoilState(DistanceState);
  return (
    <div
      key={props.index}
      id="distance-card"
      className={`flex flex-wrap w-full ${
        props?.radius * 1000 === selectedDistance
          ? "selectedCard"
          : "bg-gray-100 hover:bg-white border border-gray-400 border-opacity-25"
      } rounded-md trasition duration-300 ease-in-out shadow-xl self-center px-3 py-2 cursor-pointer`}
      onClick={() => setSelectedDistance(props.radius * 1000)}
    >
      <div className="block ml-2 self-center">
        <div id="title" className="lg:text-base text-sm font-bold">
          {props.index + 1}단계
        </div>
        <div id="member_count" className="lg:text-sm text-xs font-sm">
          반경
          <span className="ml-1 font-bold">{props.radius}KM</span>
          <span className="ml-1 tagItem rounded-md px-2 transition duration-300 ease-in-out">
            {props.radius * 1000}M
          </span>
        </div>
      </div>
    </div>
  );
}

export default DistanceModalTransition;
