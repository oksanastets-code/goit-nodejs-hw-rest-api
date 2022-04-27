const { NotFound } = require("http-errors");
const Joi = require("joi");

const contactsOperations = require("../../models/contacts")
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
const updateContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const contact = await contactsOperations.updateContact(contactId, req.body);
    if (!contact) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = updateContact;