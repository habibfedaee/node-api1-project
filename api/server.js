const express = require("express");
const server = express();
const User = require("./users/model");
server.use(express.json());

// creating a user:----------------------
server.post("/api/users", (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    //
    res.status(400).json({
      message: "Please provide name and bio for the user ",
    });
  } else {
    //
    User.insert(user)
      .then((createdUser) => {
        res.status(201).json(createdUser);
      })
      .catch((err) => {
        res.status(500).json({
          message: "error creating user",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});

// get all users -------------------------
server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      //console.log(users);
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "error gettting users",
        err: err.message,
        stack: err.stack,
      });
    });
});

// get user by id:--------------------------
server.get("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "error gettting user",
        err: err.message,
        stack: err.stack,
      });
    });
});

server.use("*", (req, res) => {
  res.status(404).json({
    message: "something not found!",
  });
});

module.exports = server;
