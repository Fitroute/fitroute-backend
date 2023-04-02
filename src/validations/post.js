const Joi = require("joi");

const commentValidation = Joi.object({
  comment: Joi.string(),
  displayName: Joi.boolean().required(),
  score: Joi.number().required(),
});

const createValidation = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  category: Joi.string().min(3).required(),
  hasComment: Joi.boolean(),
  isPublic: Joi.boolean(),
  images: Joi.array().items(Joi.string()),
});

const updateValidation = Joi.object({
  name: Joi.string().min(3),
  description: Joi.string().min(3),
  category: Joi.string().min(3).required(),
  hasComment: Joi.boolean(),
  isPublic: Joi.boolean(),
  images: Joi.array().items(Joi.string()),
});

module.exports = { commentValidation, createValidation, updateValidation };
