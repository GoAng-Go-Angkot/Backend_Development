import Joi from 'joi'

const driverValidation = {
  register: Joi.object({
    username: Joi.string().max(100).min(1).trim().required(),
    email: Joi.string().max(100).email().trim().required(),
    password: Joi.string().min(8).trim().required(),
    route: Joi.string().valid('01', '02', '03', '04', '05', '06', '07', '08', '09', '10').trim().required(),
  }),

  login: Joi.object({
    email: Joi.string().max(100).email().trim().required(),
    password: Joi.string().min(8).trim().required(),
  }),
}

export default driverValidation