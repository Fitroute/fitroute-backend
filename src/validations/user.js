const Joi = require("joi");

const loginValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).required(),
});

const registerValidation = Joi.object({
  name: Joi.string().min(3).required(),
  surname: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
});

const updateValidation = Joi.object({
  name: Joi.string().min(3),
  surname: Joi.string().min(3),
  country: Joi.string(),
  city: Joi.string(),
  image: Joi.string().allow(null),
});

const bmiValidation = Joi.object({
  height: Joi.number().allow(null),
  weight: Joi.number().allow(null),
});

const changePasswordValidation = Joi.object({
  oldPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
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
  bmiValidation,
  sendCodeValidation,
  resetValidation,
  changePasswordValidation,
};
