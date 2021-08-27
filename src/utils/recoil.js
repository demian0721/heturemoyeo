import { atom } from "recoil";

export const ActiveInviteModal = atom({
  key: "ActiveInviteModal",
  default: false,
});

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
