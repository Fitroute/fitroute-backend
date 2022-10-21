const Joi = require("joi");

const commentValidation = Joi.object({
  comment: Joi.string(),
  displayName: Joi.boolean().required(),
  score: Joi.number().required(),
});

module.exports = { commentValidation };
