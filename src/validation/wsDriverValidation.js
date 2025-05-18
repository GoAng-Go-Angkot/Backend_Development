import Joi from "joi"

const wsDriverValidation = {
  location: Joi.object({
    token: Joi.string().min(100).trim().required(),
    isFull: Joi.boolean().required(),
    location: Joi.object({
      lat: Joi.number().required(),
      long: Joi.number().required(),
    })
  }),
}

export default wsDriverValidation