import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    return res.end();
  }
  const clientIp = req.socket.remoteAddress;
  const timestamp = new Date().toISOString();

  const log = `${timestamp} - IP: ${clientIp} - Method: ${req.method} - URL: ${req.url} New Req Received \n`;

  fs.appendFile("log.txt", log, () => {});

  switch (req.url) {
    case "/":
      fs.readFile("./index.html", (err, data) => {
        if (err) {
          res.end("500 Internal server error");
        } else res.end(data);
      });
      break;

    case "/node":
      fs.readFile("./node.webp", (err, data) => {
        if (err) {
          res.end("500 Internal server error");
        } else res.end(data);
      });
      break;

    default:
      fs.readFile("./error.html", (err, data) => {
        res.end(data);
      });
      break;
  }
});

server.listen(3000, () => console.log("server started : 3000"));