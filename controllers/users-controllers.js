// Database Modeling, it's pretend data as if there were a DB, very smart
let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "skyscraper",
    location: {
      lat: 40.7484405,
      long: -73.9878531,
    },
    address: "34th street",
    creator: "u1",
  },
];

const getAllUsers = (req, res, next) => {
  console.log("got users");
};

const signUpUser = (req, res, next) => {};

const loginUser = (req, res, next) => {};

exports.getAllUsers = getAllUsers;
exports.signUpUser = signUpUser;
exports.loginUser = loginUser;
