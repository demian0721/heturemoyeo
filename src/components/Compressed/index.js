/* global kakao */

import React from "react";
// useState와 비슷하게 작동함. 단, 전역함수.
// useState 와 사용하는 방법은 같지만, useState 를 전역으로 유동적이게 사용 할 수 있는 라이브러리
// useSetRecoilState: useState 안의 [value, setValue] <- setValue 와 같은 기능을 하는 함수이다.
import { useSetRecoilState } from "recoil";
// ShowDistanceModal: recoil 의 상태를 표현하는 값이다.
import { ShowDistanceModal } from "../../utils/recoil";

import MyLocationIcon from "@material-ui/icons/MyLocation";
import RateReviewIcon from "@material-ui/icons/RateReview";
import LeakAddIcon from "@material-ui/icons/LeakAdd";

const CompressedMainButtons = ({ children, ...props }) => {
  // 내 위치 찾기
  const setPanTo = (lat, lng) =>
    global?.map?.panTo(new kakao.maps.LatLng(lat, lng));
  
  // 마커 표시 반경 설정 창
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
