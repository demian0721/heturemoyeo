import React, { Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import ImageSilder from "react-simple-image-slider";

const images = [
  { url: "/assets/First_Login_1.png" },
  { url: "/assets/First_Login_2.png" },
  { url: "/assets/First_Login_3.png" },
  { url: "/assets/First_Login_4.png" },
  { url: "/assets/First_Login_5.png" },
];

const FirstLoginModalTransition = ({ children }) => {
  const [showFirstLoginModal, setShowFirstLoginModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
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
                      setWaitComplete(true);
                    }}
                    onCompleteSlide={(idx, length) => {
                      if (length === idx) setShowBtn(true);
                      else setShowBtn(false);
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
