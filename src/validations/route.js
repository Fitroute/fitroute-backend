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
  images: Joi.array(),
});

const updateValidation = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3),
  start: Joi.date().required(),
  end: Joi.date(),
  length: Joi.number(),
  pin: Joi.array().required(),
  isPrivate: Joi.boolean().required(),
  category: Joi.string().min(3).required(),
  images: Joi.array(),
});

module.exports = { commentValidation, createValidation, updateValidation };
