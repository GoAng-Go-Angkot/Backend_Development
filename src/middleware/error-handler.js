import DatabaseError from "../exception/DatabaseError.js"
import ValidationError from "../exception/ValidationError.js"
import responseApi from "./../utils/responseApi.js"

const errorHandler = (err, req, res, next) => {
  if(err instanceof ValidationError) {
    return responseApi.badRequest(res, err.message, err.details)
  }

  if(err instanceof DatabaseError) {
    if(err.type === 'conflict') {
      return responseApi.conflict(res, err.message)
    }
  }

  return responseApi.error(res, err.message)
}

export default errorHandler