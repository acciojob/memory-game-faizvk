const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 8080;

const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
};

http
  .createServer((req, res) => {
    let file = req.url === "/" ? "/index.html" : req.url;
    const ext = path.extname(file);
    const loc = path.join(__dirname, "public", file);

    fs.readFile(loc, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("Not found");
      }
      res.writeHead(200, { "Content-Type": mime[ext] || "text/plain" });
      res.end(data);
    });
  })
  .listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
