const express = require("express")

const authController = require("../contollers/authController");

const router = express.Router();

router.post("/signUp", authController.signUp);

router.post("/login", authController.login);

router.get("/", authController.getAllUsers);

router.delete("/:id", authController.deleteUser);

module.exports = router;
