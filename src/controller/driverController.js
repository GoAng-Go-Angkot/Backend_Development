import ValidationError from "../exception/ValidationError.js"
import driverModel from "../model/driverModel.js"
import { generateTokenDriver } from "../utils/jwtHelper.js"
import responseApi from "../utils/responseApi.js"
import driverValidation from "../validation/driverValidation.js"
import validate from "../validation/validate.js"
import bcrypt from 'bcrypt'

const driverController = {
  async register(req, res, next) {
    try {
      // validation
      validate(driverValidation.register, req.body)

      // check email in db
      await driverModel.checkEmail(req.body.email)

      // insert data to db
      await driverModel.insert(req.body)

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
      validate(driverValidation.login, req.body)

      // check email in db
      const driver = await driverModel.getDriver(req.body.email)

      // check password
      const result = await bcrypt.compare(req.body.password, driver.password);
      if(!result) {
        throw new ValidationError("Password is wrong", []);
      }

      // generate token
      const token = generateTokenDriver(driver.email, driver.route, driver.id)

      // insert token to db
      await driverModel.insertToken({
        email: driver.email,
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
      const driver = await driverModel.getDriver(req.email)

      // response
      return res.json({
        data: {
          email: driver.email,
          username: driver.username,
          img_url: driver.img_url,
          route: driver.route
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
      await driverModel.checkToken(token)

      // delete token in db
      await driverModel.deleteToken(token)

      // response
      return responseApi.success(res, {
        message: "Logout success"
      }, 200)
    } catch(err) {
      next(err)
    }
  }
}

export default driverController