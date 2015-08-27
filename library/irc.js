var irc = require("irc");

var ircBot = function(settings) {
    this.settings = settings;
};

ircBot.prototype.connect = function() {
    this.client = new irc.Client('https://chat.freenode.net', 'Alice-AI', {
        channels: ['#screeps'],
    });
};

ircBot.prototype.disconnect = function(reason) {
    reason = reason || "Leaving...";
    this.client.disconnect();
};

module.exports = {
    ircBot: ircBot
}