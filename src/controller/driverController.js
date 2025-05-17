import driverModel from "../model/driverModel.js"
import responseApi from "../utils/responseApi.js"
import driverValidation from "../validation/driverValidation.js"
import validate from "../validation/validate.js"

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

      // check email in db

      // cek password

      // generate token

      // response


    } catch(err) {
      next(err)
    }
  }
}

export default driverController