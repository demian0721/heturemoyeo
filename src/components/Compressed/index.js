/* global kakao */

import React from "react";
import { useSetRecoilState } from "recoil";
import { ShowDistanceModal } from "../../utils/recoil";

import MyLocationIcon from "@material-ui/icons/MyLocation";
import RateReviewIcon from "@material-ui/icons/RateReview";
import LeakAddIcon from "@material-ui/icons/LeakAdd";

const CompressedMainButtons = ({ children, ...props }) => {
  const setPanTo = (lat, lng) =>
    global?.map?.panTo(new kakao.maps.LatLng(lat, lng));
  const setShowDistanceModal = useSetRecoilState(ShowDistanceModal);
  return (
    <div
      className="fixed bottom-0 right-0 w-20 h-20 lg:mb-28 mb-24 mr-4"
      style={{ zIndex: 2 }}
    >
      <div className="lg:space-y-2 space-y-1">
        <div className="flex justify-end">
          <button
            onClick={() => window.open("https://forms.gle/j2pyniivrJgxcn7G8")}
            className="flex lg:p-4 p-3 lg:text-base text-sm rounded-full text-center self-center minaBtn transition duration-300 ease-in-out"
          >
            <RateReviewIcon />
          </button>
        </div>
        <div className="flex justify-end self-center lg:space-x-2 space-x-1">
          <button
            onClick={() => setShowDistanceModal(true)}
            className="flex lg:p-4 p-3 lg:text-base text-sm rounded-full text-center self-center minaBtn transition duration-300 ease-in-out"
          >
            <LeakAddIcon />
          </button>
          <button
            onClick={() =>
              setPanTo(props?.coords?.latitude, props?.coords?.longitude)
            }
            className="flex lg:p-4 p-3 lg:text-base text-sm rounded-full text-center self-center minaBtn transition duration-300 ease-in-out"
          >
            <MyLocationIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompressedMainButtons;
