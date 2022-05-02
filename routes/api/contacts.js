const express = require("express");
const {validation, ctrlWrapper} = require("../../middlewares");
const {joiSchema, favoriteJoiSchema} = require("../../models/contact");
const {contacts: ctrl} = require("../../controllers")

const validateMiddleware = validation(joiSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", ctrlWrapper(ctrl.updateContact));

router.patch("/:contactId/favorite", validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateFavorite));
module.exports = router;
