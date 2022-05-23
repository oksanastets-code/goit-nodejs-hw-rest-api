const express = require("express");

const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const {joiSchema, subscriptionJoiSchema, verifyEmailJoiSchema} = require("../../models/user");

const { users: ctrl } = require("../../controllers")

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch("/", auth, validation(subscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription));

router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post("/verify", validation(verifyEmailJoiSchema), ctrlWrapper(ctrl.resendEmail));

module.exports = router;
