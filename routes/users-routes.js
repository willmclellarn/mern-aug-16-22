const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").isLength({ min: 5 }),
    check("password").not().isEmpty(),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

module.exports = router;
