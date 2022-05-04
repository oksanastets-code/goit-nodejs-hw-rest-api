const { Conflict } = require("http-errors");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const result = await User.create({ password, email });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription: "starter",
      },
    },
  });
};
module.exports = signup;
