import ValidationError from "../exception/ValidationError.js"
import clientModel from "../model/clientModel.js"
import { generateTokenClient } from "../utils/jwtHelper.js"
import responseApi from "../utils/responseApi.js"
import clientValidation from "../validation/clientValidation.js"
import validate from "../validation/validate.js"
import bcrypt from 'bcrypt'

const clientController = {
  register: async (req, res, next) => {
    try {
      // validation
       validate(clientValidation.register, req.body)

      // check email in db
       await clientModel.checkEmail(req.body.email)
 
      // insert data to db
       await clientModel.insert(req.body)
 
       // response
       const response = {
         data: {
           email: req.body.email
         }
       }
       return responseApi.success(res, response, 201)
    } catch(err) {
      next(err)
    }
  },

  login: async (req, res, next) => {
    try {
      // validation
      validate(clientValidation.login, req.body)

      // check email in db
      const client = await clientModel.getClient(req.body.email)

      // check password
      const result = await bcrypt.compare(req.body.password, client.password);
      if(!result) {
        throw new ValidationError("Password is wrong", []);
      }

      // generate token
      const token = generateTokenClient(client.email)

      // insert token to db
      await clientModel.insertToken({
        email: client.email,
        token
      })

      // response
      const response = {
        data: {
          token
        }
      }
      return responseApi.success(res, response, 200)
    } catch(err) {
      next(err)
    }
  },

  getProfile: async (req, res, next) => {
    try {
      // get driver data
      const client = await clientModel.getClient(req.email)

      // response
      return res.json({
        data: {
          email: client.email,
          username: client.username,
          img_url: client.img_url,
        }
      })
    } catch(err) {
      next(err)
    }
  },

  logout: async (req, res, next) => {
    try {
      // get token
      let token = req.headers.authorization || '';
      token = token.split(' ')[1];
      if(!token) {
        throw new ValidationError("Authentication token is missing or invalid", []);
      }

      // check token in db
      await clientModel.checkToken(token)

      // delete token in db
      await clientModel.deleteToken(token)

      // response
      return responseApi.success(res, {
        message: "Logout success"
      })
    } catch(err) {
      next(err)
    }
  }
}

export default clientController