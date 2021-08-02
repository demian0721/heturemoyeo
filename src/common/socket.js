const io = require('socket.io-client');

const socket = io("astraios.shop:4001/location", {
    path: "/socket.io"
})

// const socket = io('https://ungbeom.iptime.org:3001', { path: '/socket.io' })

export default socket;