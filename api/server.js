const express = require("express");
const server = express();

server.get("/api/users", (req, res) => {
  //console.log("gettting all users");
  res.json("usersss!!!");
});

server.use("*", (req, res) => {
  res.status(404).json({
    message: "something not found!",
  });
});

module.exports = server;
