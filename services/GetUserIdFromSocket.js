const jwt = require('jsonwebtoken');
const { JWTKey } = require('../config/index');

const GetUserIdFromSocket = async (socket) => {
    try {
        const cookie = socket.handshake.headers.cookie;
        const token = cookie.replace('token=', '');
        const decoded = await jwt.verify(token, JWTKey);
        const userId = decoded.userId;
        return userId;
    } catch (error) {
        console.log(error);
    }
}

module.exports = GetUserIdFromSocket;
