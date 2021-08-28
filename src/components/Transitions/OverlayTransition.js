import React, { useRef } from "react";
import { Transition } from "@headlessui/react";

import { useRecoilState, useRecoilValue } from "recoil";
import { LoadMarkerDataState, ShowOverlay, ShowInviteModal } from "../../utils/recoil";

import Overlay from "../Overlay";
import useOutsideClick from "../../hooks/useOutsideClick";

const OverlayTransition = ({ children, myUserId, markerData, ...props }) => {
  const showInviteModal = useRecoilValue(ShowInviteModal)
  const [loaded, setLoaded] = useRecoilState(LoadMarkerDataState);
  const [showOverlay, setShowOverlay] = useRecoilState(ShowOverlay);

  const ref = useRef();
  useOutsideClick(ref, () => {
    if (!showInviteModal) setShowOverlay(false);
    if (loaded) setLoaded(false);
  });

  return (
    <Transition
      show={loaded && showOverlay}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="absolute left-0 right-0 bottom-0 border border-gray-300 rounded-t-lg bg-white py-4 topDropShadow"
      style={{ zIndex: 11 }}
    >
      <div ref={ref} className="container mx-auto px-4">
        <div id="overlay--author__status" className="block">
          <Overlay
            isOpen={showOverlay}
            image={
              markerData?.type === "post"
                ? !markerData?.postImg ??
                  String(markerData?.postImg).length === 0
                  ? "/assets/unknownChatRoomImg.gif"
                  : markerData?.postImg
                : markerData?.type === "user"
                ? !markerData?.profileImg ??
                  String(markerData?.profileImg).length === 0
                  ? "/assets/unknownProfile.jpg"
                  : markerData?.profileImg
                : "/assets/unknownProfile.jpg"
            }
            rating={markerData?.rating}
            isType={markerData?.type ?? undefined}
            id={
              markerData?.type === "post"
                ? markerData?.postId
                : markerData?.type === "user"
                ? markerData?.userId
                : undefined
            }
            myId={myUserId}
            {...markerData}
          />
        </div>
      </div>
    </Transition>
  );
};

export default OverlayTransition;
