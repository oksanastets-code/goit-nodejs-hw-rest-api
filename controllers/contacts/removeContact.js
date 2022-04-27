const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/contacts")

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.removeContact(contactId);
    if (!contact) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: `Contact with id=${contactId} deleted`,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = removeContact;