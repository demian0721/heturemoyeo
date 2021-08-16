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
