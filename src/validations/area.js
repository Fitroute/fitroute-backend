const Joi = require("joi");

const commentValidation = Joi.object({
  comment: Joi.string(),
  displayName: Joi.boolean().required(),
  score: Joi.number().required(),
});

const createValidation = Joi.object({
  name: Joi.string().min(3).required(),
  category: Joi.string().min(3).required(),
  location: Joi.array().required(),
  images: Joi.array().items(Joi.string()),
  description: Joi.string(),
});

const updateValidation = Joi.object({
  name: Joi.string().min(3),
  category: Joi.string().min(3),
  location: Joi.array(),
  images: Joi.array().items(Joi.string()),
  description: Joi.string(),
});

module.exports = { commentValidation, createValidation, updateValidation };
