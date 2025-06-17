import { wsApp } from "../config/wsApp.js";
import { verifyTokenDriver } from "../utils/jwtHelper.js";
import validate from "../validation/validate.js";
import wsDriverValidation from "../validation/wsDriverValidation.js";

const driverWsListener = socket => {
  console.log('Driver connected - ' + socket.id);

  socket.on('disconnect', () => {
    console.log('Driver disconnected - ' + socket.id);
  });

  socket.on('driver/location', (message) => {
    try {
      // validate format message
      validate(wsDriverValidation.location, message)

      // validate token
      const driver = verifyTokenDriver(message.token)

      // format message
      const location = {
        driverId: driver.id,
        isFull: message.isFull,
        location: message.location
      }

      // emit to specific route
      wsApp.emit('route/' + driver.route, location);

      // log success foward message
      console.log({
        status: "Successfully Forwarded",
        from: driver.email,
        to: driver.route,
        message: location
      });
    } catch(err) {
      //  log error foward message
       console.log({
        status: "Failed to be Forwarded",
        error_message: err.message,
      });
      return
    }
  });
};

export default driverWsListener