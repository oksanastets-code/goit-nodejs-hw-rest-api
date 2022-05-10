const { Schema, model } = require("mongoose");
const Joi = require("joi");

const codeRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: codeRegExp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().pattern(codeRegExp).required(),
  favorite: Joi.boolean(),
});

const favoriteJoiSchema = Joi.object({
    favorite: Joi.bool().required()
})
module.exports = {
    Contact,
    joiSchema,
    favoriteJoiSchema
};
