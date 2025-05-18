import AuthError from "../exception/AuthError.js";
import ValidationError from "../exception/ValidationError.js";
import { verifyTokenDriver } from "../utils/jwtHelper.js";

const cekDriver = (req, res, next) => {
  try {
    // get token
    let token = req.headers.authorization || '';
    token = token.split(' ')[1];
    if(!token) {
      throw new ValidationError("Authentication token is missing or invalid", []);
    }

    // verify token
    let driver
    try {
      driver = verifyTokenDriver(token)
    } catch(err) {
      throw new AuthError("Authentication token is invalid")
    }

    // attach token to req.email
    req.email = driver.email

    next()
  } catch(err) {
    next(err)
  }
}

export default cekDriver