const Joi = require("joi");

const commentValidation = Joi.object({
  comment: Joi.string(),
  displayName: Joi.boolean().required(),
  score: Joi.number().required(),
});

const createValidation = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3),
  start: Joi.date().required(),
  end: Joi.date(),
  length: Joi.number(),
  pin: Joi.array().required(),
  isPrivate: Joi.boolean().required(),
  category: Joi.string().min(3).required(),
  images: Joi.array().items(Joi.string()),
});

const updateValidation = Joi.object({
  name: Joi.string().min(3),
  description: Joi.string().min(3),
  start: Joi.date(),
  end: Joi.date(),
  length: Joi.number(),
  pin: Joi.array(),
  isPrivate: Joi.boolean(),
  category: Joi.string().min(3),
  images: Joi.array().items(Joi.string()),
});

module.exports = { commentValidation, createValidation, updateValidation };
