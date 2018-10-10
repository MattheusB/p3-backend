const express = require("express");
const router = new express.Router();
const auth = require("../auth/auth");
const userController = require("../user/user.controller");


router.use((req,res,next) => {
    next();
});

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserID);
router.get("/:id/profile", userController.getUserProfile);
router.get("/:id/likes", userController.getUserLikes);
router.post("/", userController.addUser);
router.put("/:id", userController.updateUser); 
router.delete("/:id", userController.deleteUser);

module.exports = router;
