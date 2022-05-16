const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models");

const imageDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    // const [extension] = originalname.split(".").reverse();
  const avatarName = `${_id}_${originalname}`;
  try {
    const resultUpload = path.join(imageDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", avatarName);

    Jimp.read(avatarURL, (err, avatar) => {
      if (err) throw err;
      avatar.resize(250, 250);
    });

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
};
module.exports = updateAvatar;
