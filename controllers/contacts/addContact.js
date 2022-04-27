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
const contactsOperations = require("../../models/contacts")

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const contact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = addContact;