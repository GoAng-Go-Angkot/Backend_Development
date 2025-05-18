import { wsApp } from "../config/wsApp.js";
import { verifyTokenDriver } from "../utils/jwtHelper.js";
import validate from "../validation/validate.js";
import wsDriverValidation from "../validation/wsDriverValidation.js";

const driverWsListener = socket => {
  socket.on('driver/location', (message) => {
    try {
      // validate format message
      validate(wsDriverValidation.location, message)

      // validate token
      const driver = verifyTokenDriver(message.token)

      // emit to specific route
      const location = {
        driverId: driver.id,
        isFull: message.isFull,
        location: message.location
      }
      wsApp.emit('route/' + driver.route, location);
    } catch(err) {
      return
    }
  });
};

export default driverWsListener