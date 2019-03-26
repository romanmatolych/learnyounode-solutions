/**
 * HTTP FILE SERVER (Exercise 11 of 13)
 * Write an HTTP server that serves the same text file for each request it
  receives.

  Your server should listen on the port provided by the first argument to
  your program.

  You will be provided with the location of the file to serve as the second
  command-line argument. You must use the fs.createReadStream() method to
  stream the file contents to the response.
 */
const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    const rs = fs.createReadStream(process.argv[3]);
    
    rs.on("error", () => {
        res.statusCode = 500;
        res.end("Server Error");
    });
    
    req.on("close", () => {
        rs.destroy();
    });

    rs.pipe(res);

}).listen(+process.argv[2]);