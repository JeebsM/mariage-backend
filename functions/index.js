const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const middleware = require("./middleware");
const database = require("./api/database");

const server = express();
const recordsRouter = require("./api/controllers/record_controller");
const usersRouter = require("./api/controllers/user_controller");

// Automatically allow cross-origin requests
server.use(cors({ origin: true }));

server.use(middleware.decodeToken);

server.use(express.json());
server.use("/records", recordsRouter);
server.use("/users", usersRouter);

exports.createNewUser = functions.auth.user().onCreate(user => {
  let newUser = {
    "id": user.uid,
    "mail": user.email,
    "surname": '',
    "family": '',
    "adult": 1,
    "child": 0,
    "witness": false,
    "host": false
  };
  return database.createRecordWithId("users", user.uid, newUser);
});

exports.api = functions.https.onRequest(server);
//exports.setupdb = functions.https.onRequest(require('./api/setup_database'));