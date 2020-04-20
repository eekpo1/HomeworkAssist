/* Our Node Settings. We work with express in ./e2e/app.js */

const http = require("http");
const app = require("./e2e/app");
const debug = require("debug")("node.angular");


const normalizePort = val => {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof addr === "string" ? `pipe: ${addr}` : `port ${port}`;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address;
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr}`;
  debug(`Listening on ${bind}`);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
const server = http.createServer(app);

server.listen(port);

module.exports = app;
