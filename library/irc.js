var irc = require("irc");

var ircBot = function(settings) {
    this.settings = settings;
};

ircBot.prototype.connect = function() {
    this.client = new irc.Client('chat.freenode.net', 'Alica', {
        channels: ['#screeps'],
    });

    this.client.addListener('message', function (from, to, message) {
        console.log(from + ' => ' + to + ': ' + message);
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

module.exports = {
    ircBot: ircBot
};