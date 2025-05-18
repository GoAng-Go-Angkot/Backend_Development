import { verifyTokenClient, verifyTokenDriver } from "../utils/jwtHelper.js";

export const checkConnectClient = (socket, next) => {
  let token = socket.handshake.auth.token;
  token = token ? token : socket.handshake.headers.authorization;

  try {
    verifyTokenClient(token);
    next()
  } catch(err) {
    next(new Error('Invalid token'));
  }
}

export const checkConnectDriver = (socket, next) => {
  let token = socket.handshake.auth.token;
  token = token ? token : socket.handshake.headers.authorization;

  try {
    verifyTokenDriver(token);
    next()
  } catch(err) {
    next(new Error('Invalid token'));
  }
}