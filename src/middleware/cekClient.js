import AuthError from "../exception/AuthError.js";
import ValidationError from "../exception/ValidationError.js";
import clientModel from "../model/clientModel.js";
import { verifyTokenClient } from "../utils/jwtHelper.js";

const cekClient = async (req, res, next) => {
  try {
    // get token
    let token = req.headers.authorization || '';
    token = token.split(' ')[1];
    if(!token) {
      throw new ValidationError("Authentication token is missing or invalid", []);
    }

    // verify token
    let client
    try {
      client = verifyTokenClient(token)
      try {
        await clientModel.checkToken(token)
      } catch(err) {
        throw new Error('Token not found')
      }
    } catch(err) {
      throw new AuthError("Authentication token is invalid")
    }

    // attach token to req.email
    req.email = client.email

    next()
  } catch(err) {
    next(err)
  }
}

export default cekClient