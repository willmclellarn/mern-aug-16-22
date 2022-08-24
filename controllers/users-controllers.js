const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

// Database Modeling, it's pretend data as if there were a DB, very smart
let DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "test@test.com",
    password: "testers",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("invalid inputs passed, please check your data", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => {
    return u.email === email;
  });
  if (hasUser) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }

  const createdUser = {
    id: uuidv4(),
    name, // name: name
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  // check to see if user exists, first
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  // if not, throw an error (really just send them to sign up?)
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Something went wrong - you did not login", 401);
  } else {
    res.json({ message: "logged in" });
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
