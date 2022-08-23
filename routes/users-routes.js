const express = require("express");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersController.getAllUsers);

router.post("/signup", usersController.signUpUser);

router.post("/login", usersController.loginUser);

module.exports = router;
