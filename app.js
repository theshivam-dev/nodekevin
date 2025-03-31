import http from "http";
import fs from "fs/promises";

const server = http.createServer(async (req, res) => {
  if (req.url === "/favicon.ico") {
    res.end();
  } else {
    const timestamp = new Date().toISOString();
    const clientIp = req.socket.remoteAddress;
    const log = `${timestamp} - IP: ${clientIp} - Method: ${req.method} - URL: ${req.url} New Req Received \n`;

    try {
      switch (req.url) {
        case "/":
          await fs.appendFile("log.txt", log);
          const html = await fs.readFile("./public/index.html");
          res.writeHead(200, { "content-type": "text/html" });
          res.end(html);
          break;

        case "/script.js":
          await fs.appendFile("log.txt", log);
          const script = await fs.readFile("./public/script.js");
          res.writeHead(200, { "content-type": "text/javascript" });
          res.end(script);
          break;

        case "/style.css":
          await fs.appendFile("log.txt", log);
          const style = await fs.readFile("./public/style.css");
          res.writeHead(200, { "content-type": "text/css" });
          res.end(style);
          break;

        case "/json":
          await fs.appendFile("log.txt", log);
          const json = await fs.readFile("./public/data.json",'utf-8');
          res.writeHead(200, { "content-type": "application/json" });
          res.end(json);
          break;

        default:
          await fs.appendFile("log.txt", log);
          const error = await fs.readFile("./public/error.html");
          res.writeHead(200, { "content-type": "text/html" });
          res.end(error);
          break;
      }
    } catch (error) {
      console.log(error);
      await fs.appendFile("log.txt", log);
      res.writeHead(500);
      res.end("Internal server error");
    }
  }
});

server.listen(3000, () => console.log("server start : 3000"));
