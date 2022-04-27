const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    // .alphanum()
    .required(),
  email: Joi.string()
    // .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
});
module.exports = contactSchema;