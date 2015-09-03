var fs = require("fs");
var path = require("path");

var plugins = function(settings) {
    settings = settings || {};
    settings.location = settings.location || path.join(__dirname, "../plugins");

    var plugins = {
        _isLoaded: false
    };

    var readDirectory = function(err, list) {
        if (err) {
            throw err;
        }

        // Iterate list
        for (var i of list) {
            if (/.js$/.test(i)) {
                console.log("Loading plugin " + i.substr(i, i.length - 3));
                plugins[i] = require(path.join(settings.location, i));
            }
        }
    };

    fs.readdir(settings.location, readDirectory);

    return plugins;
};

module.exports = plugins;