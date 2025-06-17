import { Server } from 'socket.io';
import { checkConnectClient, checkConnectDriver } from '../middleware/checkWsConnection.js';
import driverWsListener from '../ws_listener/driverWsListener.js';
import clientWsListener from '../ws_listener/clientWsListener.js';

let wsApp

const attachWebSocket = (server) => {
  // client ws instance
  wsApp = new Server(server, {
    cors: {
      origin: "*",
      // methods: ['GET', 'POST'],
      // credentials: true
    },
    connectionStateRecovery: {}
  });
  
  // client middleware check connect
  // wsApp.use(checkConnectClient);

  // client listener
  wsApp.on('connection', clientWsListener);

  // driver ws instance
  const wsServerDriver = wsApp.of('/driver');

  // driver middleware check connect
  // wsServerDriver.use(checkConnectDriver);

  // driver listener
  wsServerDriver.on('connection', driverWsListener);
}

export { wsApp, attachWebSocket }