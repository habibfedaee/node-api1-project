// BUILD YOUR SERVER HERE

const express = require("express");
const server = express();

server.use("*", (req, res) => {
  res.status(404).json({
    message: "something not found!",
  });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
