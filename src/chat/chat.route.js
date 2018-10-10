const express = require("express");
const router = new express.Router();
const auth = require("../auth/auth");
const chatController = require("../chat/chat.controller")

router.use((req,res,next) => {
    next();
});

router.get("/", chatController.getChats);
router.post("/", chatController.addChat);
router.get("/:id", chatController.getChatID);
router.put("/:id", chatController.updateChat);
router.delete("/:id", chatController.deleteChat);

module.exports = router;