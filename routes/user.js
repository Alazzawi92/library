const express = require("express");
const router = express.Router();
const userController = require("./../Controllers/Controller-U");
const auth = require("./../middlewares/auth");
router.get("/login", userController.loginView);
router.post("/login", userController.login);
router.get("/show-profile-user/:id",auth,userController.profilePage);
router.get("/logout", userController.logout)
router.get("/register", userController.registerView);
router.post("/register", userController.register);
router.delete("/delete-User/:id", auth, userController.deleteUser);
router.get("/update-User/:id", auth, userController.updateUserView);
router.put("/put-User/:id", auth, userController.putUser);

module.exports = router;