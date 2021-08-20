import { getToken } from "./token";

const io = require("socket.io-client");

const socket = io("https://astraios.shop/location", {
  extraHeaders: { authorization: `${getToken()}` },
  path: "/socket.io"
});

export default socket;
