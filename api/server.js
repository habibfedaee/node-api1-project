const express = require("express");
const server = express();
const User = require("./users/model");
server.use(express.json());

// updating a user: -----------------------
server.put("/api/users/:id", async (req, res) => {
  try {
    const possibleUser = await User.findById(req.params.id);

    if (!possibleUser) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      if (!req.body.name || !req.body.bio) {
        res.status(400).json({
          message: "Please provide name and bio for the user",
        });
      } else {
        const updatedUser = await User.update(req.params.id, req.body);
        res.status(200).json(updatedUser);
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating the user ",
      error: error.message,
      stack: error.stack,
    });
  }
});

// deleting a user:----------------------
server.delete("/api/users/:id", async (req, res) => {
  const userToDelete = await User.findById(req.params.id);
  //console.log("user to delete: ", userToDelete);
  if (!userToDelete) {
    res.status(404).json({
      message: "The user with the specified ID does not exist",
    });
  } else {
    const deletedUser = await User.remove(userToDelete.id);
    res.status(200).json(deletedUser);
  }
});

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
