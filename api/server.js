const express = require("express");
const server = express();
const User = require("./users/model");

// get all users
server.get("/api/users", (req, res) => {
  //console.log("gettting all users");
  //res.json("usersss!!!");

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

// get user by id:
server.get("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      //console.log(user);
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
