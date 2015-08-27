#!/usr/bin/env node

var irc = require("../library/irc.js");

var client = new irc.ircBot();

client.connect();