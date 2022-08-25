const { v4: uuidv4 } = require("uuid");
// uuidv4();
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");

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
// End Database Pretend Model

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
    // throw cancels execution
  }
  res.json({ place }); // { place } => {place: place}
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  // const places = [];
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    // return stops the rest of the code execution
    // return to stop execution
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }

  res.json({ places }); // { place } => {place: place}
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    // always need to next errors in async code
    next(new HttpError("invalid inputs passed, please check your data", 422));
  }

  const { title, description, address, creator } = req.body;

  // convert address to coordinates
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("invalid inputs passed, please check your data", 422);
  }

  const { title, description } = req.body;
  let placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  let placeId = req.params.pid;
  if (DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("could not find a place to delete", 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => {
    p.id !== placeId;
  });

  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
