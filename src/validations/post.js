const Joi = require("joi");

const commentValidation = Joi.object({
  comment: Joi.string(),
  displayName: Joi.boolean().required(),
  score: Joi.number().required(),
});

const createValidation = Joi.object({
  title: Joi.string().min(3).required(),
  bodyText: Joi.string().min(3).required(),
  hasComment: Joi.boolean(),
  isPublic: Joi.boolean(),
  images: Joi.array().items(Joi.string()),
});

const updateValidation = Joi.object({
  title: Joi.string().min(3),
  bodyText: Joi.string().min(3),
  hasComment: Joi.boolean(),
  isPublic: Joi.boolean(),
  images: Joi.array().items(Joi.string()),
});

module.exports = { commentValidation, createValidation, updateValidation };
