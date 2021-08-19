import { getToken } from "./token";

const io = require("socket.io-client");

const socket = io("astraios.shop/location", {
  extraHeaders: { authorization: `${getToken()}` },
  path: "/socket.io",
  secure: true
});

export default socket;
