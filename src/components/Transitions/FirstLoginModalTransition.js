import React, { Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import ImageSilder from "react-simple-image-slider";

// 모달 안의 이미지 리스트
const images = [
  { url: "/assets/First_Login_1.png" },
  { url: "/assets/First_Login_2.png" },
  { url: "/assets/First_Login_3.png" },
  { url: "/assets/First_Login_4.png" },
  { url: "/assets/First_Login_5.png" },
];

const FirstLoginModalTransition = ({ children }) => {
  // 현재 상태가 처음 로그인 한 상태인지 확인할 수 있는 상태
  const [showFirstLoginModal, setShowFirstLoginModal] = useState(false);
  // 이미지 슬라이더가 마지막 페이지에 도달할때 버튼의 표시 상태를 관리할 수 있는 상태
  const [showBtn, setShowBtn] = useState(false);
  // 이미지 슬라이더를 넘겼을때 해당 이미지로 변경될때까지를 관리할 수 있는 상태
  // * 마지막 이미지에 도착하였을때, showBtn 이라는 상태를 이용하여, 버튼을 보여줄 수 있음.
  //   해당 이미지로 넘어가는 타이밍을 봐서, 해당 이미지로 완전히 넘어갔을때 waitComplete를 true로 변경
  const [waitComplete, setWaitComplete] = useState(false);

  const handleFirstModalClose = () => {
    localStorage.setItem("firstLogin", false);
    setShowFirstLoginModal(false);
  };

  useEffect(() => {
    if (localStorage.getItem("firstLogin") === "true")
      setShowFirstLoginModal(true);
  }, []);

  return (
    <Transition show={showFirstLoginModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed lg:mt-40 md:mt-32 mt-20 inset-0 z-10"
        onClose={() => {}}
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
            <div className="inline-block w-full lg:max-w-sm max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl self-center items-center border border-gray-300 border-opacity-25">
              <Dialog.Title
                as="h3"
                className="text-base font-medium leading-6 text-gray-900"
              >
                헤쳐모여
              </Dialog.Title>
              <div className="mb-2">
                <p className="text-sm text-gray-500">
                  "실시간 위치기반 소모임 플랫폼"
                </p>
              </div>

              <div
                className="flex w-full p-2 overflow-none justify-center items-center self-center"
                style={{ height: "380px" }}
              >
                <div className="flex flex-wrap w-full rounded-md justify-center items-center self-center">
                  <ImageSilder
                    width={290}
                    height={380}
                    images={images}
                    useGPURender={true}
                    slideDuration={0.7}
                    onClickNav={() => {
                      // 이미지 슬라이더 버튼을 누룰 시, waitComplete 상태를 true로 변경
                      setWaitComplete(true);
                    }}
                    onCompleteSlide={(idx, length) => {
                      // 이미지 리스트의 길이와 현재 이미지 슬라이더의 이미지 순서를 비교하여 해당 이미지가 마지막 이미지인지를 확인.
                      // 만약 이미지 리스트의 길이와 현재 이미지 슬라이더의 이미지 순서가 같다면, showBtn 상태를 true로 변경
                      if (length === idx) setShowBtn(true);
                      // 아니면 false
                      else setShowBtn(false);
                      // 이미지가 완전히 변경되었을 경우, waitComplete를 false 로 변경
                      setWaitComplete(false);
                    }}
                    showNavs={true}
                    navStyle={2}
                    navMargin={5}
                    bgColor="#16c59b"
                  />
                </div>
              </div>
              {showBtn && (
                <div className="flex justify-center mt-4 w-full">
                  <button
                    type="button"
                    // className="flex justify-center w-full py-2 lg:text-sm text-xs font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    className="flex justify-center w-full py-2 lg:text-sm text-xs font-medium customBtn shadow-md rounded-md transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    onClick={() => {
                      /**
                       * waitComplete 상태가 false 일 경우, 해당 함수를 실행할 수 있음.
                       * 
                       * 이것을 해놓은 이유,
                       * 이미지 슬라이더를 넘길때, 마지막 페이지에서만 버튼이 보이지만, 이전 페이지로 넘길때,
                       * 해당 버튼이 눌리는 걸 방지하기 위하여 했음.
                       */
                      if (!waitComplete) handleFirstModalClose();
                    }}
                  >
                    시작하기
                  </button>
                </div>
              )}
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
              className="fixed left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-50"
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

export default FirstLoginModalTransition;
