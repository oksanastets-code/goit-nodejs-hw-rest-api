const express = require("express");

const { validation, ctrlWrapper, auth } = require("../../middlewares");
const {joiSchema} = require("../../models/user");

const { users: ctrl } = require("../../controllers")

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login))
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent))
router.get("/logout", auth, ctrlWrapper(ctrl.logout))
module.exports = router;
