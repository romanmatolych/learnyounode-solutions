/**
 * JUGGLING ASYNC (Exercise 9 of 13)
 * This problem is the same as the previous problem (HTTP COLLECT) in that
  you need to use http.get(). However, this time you will be provided with
  three URLs as the first three command-line arguments.

  You must collect the complete content provided to you by each of the URLs
  and print it to the console (stdout). You don't need to print out the
  length, just the data as a String; one line per URL. The catch is that you
  must print them out in the same order as the URLs are provided to you as
  command-line arguments.
 */
const http = require("http");

const urls = process.argv.slice(2);

function get(url) {
    return new Promise(function(resolve, reject) {
        http.get(url, res => {
            res.setEncoding("utf-8");

            let data = "";

            res.on("data", chunk => {
                data += chunk;
            });

            res.on("end", () => {
                resolve(data);
            });

            res.on("error", reject);

        }).on("error", reject);
    });
}

Promise.all(urls.map(url => get(url))).then(values => {
    values.forEach(val => {
        console.log(val);
    });
});