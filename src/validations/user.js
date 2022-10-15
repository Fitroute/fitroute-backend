const Joi = require("joi");

const loginValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const registerValidation = Joi.object({
  name: Joi.string().min(3).required(),
  surname: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
});

const updateValidation = Joi.object({
  name: Joi.string().min(3),
  surname: Joi.string().min(3),
  email: Joi.string().email(),
  country: Joi.string(),
  city: Joi.string(),
  height: Joi.number(),
  weight: Joi.number(),
});

const sendCodeValidation = Joi.object({
  email: Joi.string().email().required(),
});
const resetValidation = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  loginValidation,
  registerValidation,
  updateValidation,
  sendCodeValidation,
  resetValidation,
};
