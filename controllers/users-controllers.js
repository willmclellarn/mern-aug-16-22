const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

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
  const { name, email, password } = req.body;
  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.send(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  // check to see if user exists, first
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  // if not, throw an error (really just send them to sign up?)
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("This user does not exist", 401);
  } else {
    res.json({ message: "logged in" });
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
