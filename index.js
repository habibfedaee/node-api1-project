const server = require("./api/server");

const port = 9000;

// START YOUR SERVER HERE
//console.log("Hey");

server.listen(port, () => {
  console.log("listening on", port);
});
