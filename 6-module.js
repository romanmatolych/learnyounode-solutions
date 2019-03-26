const fs = require("fs");
const path = require("path");

module.exports = function(dirname, ext, cb) {
    fs.readdir(dirname, function(err, files) {
        if (err) return cb(err);
        
        cb(null, files.filter(file => path.extname(file) === `.${ext}`));
    });
};