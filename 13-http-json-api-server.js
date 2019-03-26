/**
 * HTTP JSON API SERVER (Exercise 13 of 13)
 * Write an HTTP server that serves JSON data when it receives a GET request
  to the path '/api/parsetime'. Expect the request to contain a query string
  with a key 'iso' and an ISO-format time as the value.

  For example:

  /api/parsetime?iso=2013-08-10T12:10:15.474Z

  The JSON response should contain only 'hour', 'minute' and 'second'
  properties. For example:

     {
       "hour": 14,
       "minute": 23,
       "second": 15
     }

  Add second endpoint for the path '/api/unixtime' which accepts the same
  query string but returns UNIX epoch time in milliseconds (the number of
  milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.
  For example:

     { "unixtime": 1376136615474 }

  Your server should listen on the port provided by the first argument to
  your program.
 */
const http = require("http");
const url = require("url");

http.createServer((req, res) => {
    const urlParsed = url.parse(req.url, true);

    // Validation of our endpoints
    if (urlParsed.pathname === '/api/parsetime' || 
        urlParsed.pathname === '/api/unixtime') {
            if (!urlParsed.query.iso || Number.isNaN(Date.parse(urlParsed.query.iso))) {
                res.statusCode = 400;
                res.end("Bad Request");
                return;
            }
    }

    // Routes
    switch (urlParsed.pathname) {
        case '/api/parsetime': {
            const date = new Date(urlParsed.query.iso);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds()
            }));
            break;
        }

        case '/api/unixtime': {
            const date = new Date(urlParsed.query.iso);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                unixtime: date.getTime()
            }));
            break;
        }

        default:
            res.statusCode = 404;
            res.end("Not Found");
    }
}).listen(+process.argv[2]);