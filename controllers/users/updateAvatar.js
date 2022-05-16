const path = require("path");
const fs = require("fs/promises");

const { User } = require("../../models");

const imageDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const avatarName = `${_id}_${originalname}`;
  try {
    const resultUpload = path.join(imageDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", avatarName);
    await User.findByIdAndUpdate(
      _id,
      { avatarURL }
    );
    res.status(200).json( { avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};
module.exports = updateAvatar;
