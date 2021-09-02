import { atom } from "recoil";

export const MyScheduleList = atom({
  key: "MyScheduleList",
  default: null,
});

export const SelectedPostCard = atom({
  key: "SelectedPostCard",
  default: 0,
});

export const ChatRoomSideBar = atom({
  key: "ChatRoomSideBar",
  default: false,
});

export const DistanceState = atom({
  key: "DistanceState",
  default: 2000,
});

export const ShowDistanceModal = atom({
  key: "ShowDistanceModal",
  default: false,
});

// Transtion Component Recoil
// Overlay
export const LoadMarkerDataState = atom({
  key: "LoadMarkerDataState",
  default: false,
});

export const ShowOverlay = atom({
  key: "ShowOverlay",
  default: false,
});

// Overlay -> Invite modal
export const ShowInviteModal = atom({
  key: "ShowInviteModal",
  default: false,
});
