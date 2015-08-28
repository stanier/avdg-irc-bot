#!/usr/bin/env node
var child = require("child_process");
var http = require("http");
var os = require("os");
var url = require("url");

var irc = require("../library/irc.js");
var settings = require("../settings.js");

var client;
var httpServer;

var bootstrap = function() {
    var restartRequestHandler = function(req, res) {
        var path = url.parse(req.url).pathname;

        if (path === "/restart/" + settings.webserver.password) {
            res.writeHead(200);
            res.end();
            reboot();
            return;
        }

        res.writeHead(404);
        res.end();
    };

    client = new irc.ircBot();
    client.connect();

    httpServer = http.createServer(restartRequestHandler);
    httpServer.listen(settings.webserver.port || 8080);
};

var reboot = function() {
    client.disconnect("Fetching updates from repository");
    console.log("=== Upgrading...");
    var result = child.execSync('git pull ' + (/^win/.test(os.platform) ? '&' : '&&') + ' npm install', {
        encoding: 'utf-8'
    });
    console.log(result);
    console.log("=== Upgrade ended");

    process.exit(8);
};

bootstrap();