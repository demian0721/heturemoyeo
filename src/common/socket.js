const io = require('socket.io-client');

const socket = io("astraios.shop:4001/location", {
    path: "/socket.io"
})

export default socket;