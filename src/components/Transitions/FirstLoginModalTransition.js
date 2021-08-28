import React, { useRef, Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";

const FirstLoginModalTransition = ({ children }) => {
  const [showFirstLoginModal, setShowFirstLoginModal] =
    useState(false);

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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl self-center items-center border border-gray-300 border-opacity-25">
              <Dialog.Title
                as="h3"
                className="text-base font-medium leading-6 text-gray-900"
              >
                헤쳐모여
              </Dialog.Title>
              <div className="mb-2">
                <p className="text-sm text-gray-500">
                  "운동인을 위한 번개모임 어플"
                </p>
              </div>

              <div
                className="flex w-full bg-gray-300 rounded-md bg-opacity-25 p-2 border border-gray-400 border-opacity-25 overflow-none"
                style={{ height: "305px" }}
              >
                {/* <div
                id="container"
                className="text-center w-full"
                style={{
                  transition: "left",
                  WebkitTransition: "left",
                  MozTransition: "left",
                  transitionDuration: "0.5s",
                  WebkitTransitionDuration: "0.5s",
                  MozTransitionDuration: "0.5s",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <div
                  id="slide-1"
                  className="float-left m-0 p-0"
                  style={{ height: "305px" }}
                >
                  <span>1</span>
                </div>
                <div
                  id="slide-2"
                  className="float-left m-0 p-0"
                  style={{ height: "305px" }}
                >
                  <span>2</span>
                </div>
                <div
                  id="slide-3"
                  className="float-left m-0 p-0"
                  style={{ height: "305px" }}
                >
                  <span>3</span>
                </div>
                <div
                  id="slide-4"
                  className="float-left m-0 p-0"
                  style={{ height: "305px" }}
                >
                  <span>4</span>
                </div>
                <div
                  id="slide-5"
                  className="float-left m-0 p-0"
                  style={{ height: "305px" }}
                >
                  <span>0</span>
                </div>
              </div> */}
              </div>
              <div className="flex justify-center mt-4 w-full">
                <button
                  type="button"
                  className="flex justify-center w-full py-2 lg:text-sm text-xs font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  onClick={handleFirstModalClose}
                >
                  시작하기
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FirstLoginModalTransition;
