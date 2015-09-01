var irc = require("irc");

var ircBot = function(settings) {
    this.settings = settings;
    this.settings.plugins = this.settings.plugins || {};
};

ircBot.prototype.connect = function() {
    var self = this;
    this.client = new irc.Client('chat.freenode.net', 'Alica', {
        channels: this.settings.channels,
    });

    this.client.addListener('message', function (from, to, message) {
        console.log(from + ' => ' + to + ': ' + message);
        self.emitPlugins('message', from, to, message);
    });

    this.client.addListener('pm', function (from, message) {
        console.log(from + ' => ME: ' + message);
    });

    this.client.addListener('error', function(message) {
        console.log('error: ', message);
    });
};

ircBot.prototype.disconnect = function(reason) {
    reason = reason || "Leaving...";
    this.client.disconnect(reason);
};

ircBot.prototype.on = function() {
    this.client.addListener.apply(this.client, arguments);
};

ircBot.prototype.emitPlugins = function() {
    var type = arguments[0];
    var args = [];

    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    for (var j in this.settings.plugins) {
        if (typeof this.settings.plugins[j] === "object" && typeof this.settings.plugins[j][type] === "function") {
            this.settings.plugins[j][type].apply(this.client, args);
        }
    }
};

module.exports = {
    ircBot: ircBot
};