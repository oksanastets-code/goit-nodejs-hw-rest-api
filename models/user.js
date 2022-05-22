const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema({
password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  }
}, { versionKey: false, timestamps: true });

const User = model("user", userSchema); 

const joiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
});

const subscriptionJoiSchema = Joi.object({
      subscription: Joi.string().valid("starter", "pro", "business").required()

})
module.exports = {
    User,
    joiSchema,
    subscriptionJoiSchema
}