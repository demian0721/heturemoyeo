import { getToken } from './token'

const io = require("socket.io-client");

const socket = io("astraios.shop:4001/location", {
    extraHeaders: { authorization: `${getToken()}` },
    path: "/socket.io",
});

export default socket;
