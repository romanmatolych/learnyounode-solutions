/**
 * HTTP UPPERCASERER (Exercise 12 of 13)
 * Write an HTTP server that receives only POST requests and converts
  incoming POST body characters to upper-case and returns it to the client.

  Your server should listen on the port provided by the first argument to
  your program.
 */
const http = require("http");
const stream = require("stream");

const upperCaseStream = new stream.Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

http.createServer((req, res) => {
    if (req.method !== 'POST') {
        res.statusCode(405);
        res.end();
        return;
    }

    req.pipe(upperCaseStream)
        .pipe(res);
}).listen(+process.argv[2]);