import Joi from 'joi'

const clientValidation = {
  register: Joi.object({
    username: Joi.string().max(100).min(1).trim().required(),
    email: Joi.string().max(100).email().trim().required(),
    password: Joi.string().min(8).trim().required(),
  }),

  login: Joi.object({
    email: Joi.string().max(100).email().trim().required(),
    password: Joi.string().min(8).trim().required(),
  }),
}

export default clientValidation