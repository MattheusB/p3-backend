/* eslint-disable consistent-return */

const express = require("express");
const router = new express.Router();
const authController = require("../auth/auth.controller")
const auth = require("../auth/auth");


router.post("/", authController.login);
router.delete("/", authController.logout);
router.get("/verify", authController.verify);

module.exports = router;