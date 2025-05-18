import { Server } from 'socket.io';
import { checkConnectClient, checkConnectDriver } from '../middleware/checkWsConnection.js';
import driverWsListener from '../ws_listener/driverWsListener.js';

let wsApp

const attachWebSocket = (server) => {
  // ws instance
  wsApp = new Server(server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST'],
      credentials: true
    },
    connectionStateRecovery: {}
  });
  
  // middleware check connect client
  wsApp.use(checkConnectClient);

  // driver ws instance
  const wsServerDriver = wsApp.of('/driver');

  // middleware check connect driver
  wsServerDriver.use(checkConnectDriver);

  // driver listener
  wsServerDriver.on('connection', driverWsListener);
}

export { wsApp, attachWebSocket }