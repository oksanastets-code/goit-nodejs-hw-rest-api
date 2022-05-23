const { BadRequest } = require("http-errors");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  const { verificationToken } = user;
console.log(verificationToken);
  const mail = {
    to: email,
    subject: "Confirm your email",
    html: `<a target="_blank" href="http://localhost:3001/api/users/verify/${verificationToken}">Click to confirm</a>`,
  };
  await sendEmail(mail);

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
    data: {
      user: {
        email,
        verificationToken,
      },
    },
  });
};
module.exports = resendEmail;
