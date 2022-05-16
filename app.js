const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// const multer = require('multer');
// const path = require("path");
// const fs = require("fs/promises");

require("dotenv").config();

const usersRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts')

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

// const tempDir = path.join(__dirname, "temp");
// const imageDir = path.join(__dirname, "public", "avatars");
// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tempDir)
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: {
//     filesize: 2048
//   }
// });

// const upload = multer({
//   storage: multerConfig
// });

// app.post("/avatars", upload.single("image"), async (req, res) => {
//   const {path: tempUpload, originalname} = req.file;
//    const resultUpload = path.join(imageDir, originalname);
//    try {
//         await fs.rename(tempUpload, resultUpload);
//         const image = path.join( "avatars", originalname);
//         const newProduct = {
//             name: req.body.name,
//             image
//         };
//             res.status(201).json(newProduct);
//    } catch (error) {
//        await fs.unlink(tempUpload);
//    }
// })
app.use("/api/users", usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message })
})

module.exports = app;  