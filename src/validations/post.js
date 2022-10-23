const Joi = require("joi");

const commentValidation = Joi.object({
  comment: Joi.string(),
  displayName: Joi.boolean().required(),
  score: Joi.number().required(),
});

const createValidation = Joi.object({
  title: Joi.string().min(3).required(),
  bodyText: Joi.string().min(3).required(),
  images: Joi.array(),
});

const updateValidation = Joi.object({
  title: Joi.string().min(3).required(),
  bodyText: Joi.string().min(3).required(),
  images: Joi.array(),
});

module.exports = { commentValidation, createValidation, updateValidation };
