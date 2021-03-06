var vm = require("vm");
var _ = require("lodash");

// Usage:
// > var write = console.commands();
// >> var write = console.commands({verbose: true});

function executeJavascript(input, options) {
    if (input[0] !== ">" || input.length > 255) {
        return;
    }

    var startPos = input[1] === ">" ? 2 : 1;

    try {
         // Timeout set to a bit more than 1 screen frame duration
        return vm.runInNewContext(input.slice(startPos), {version: _.clone(process.versions)}, {
            timeout: 17,
            filename: (options.botname || "ai") + ".vm"
        }).replace(/\n/g, "");
    } catch (e) {
        var error = e.message;
        var lines = error.split("\n");

        if (startPos === 1 && /\n\s*\^\s*\n/.test(error)) {
            error = lines[lines.length - 1] + " (" + lines[0] + ")";
        } else if (lines.length > 4) {
            error = lines.splice(0, 4).join("\n") + lines.splice(5).join("");
        }

        return error;
    }
}

function runScriptInChat(client, to, message) {
    var result = executeJavascript(message, {botname: client.nick});

    if (result !== undefined) {
        client.say(to, result);
    }
}

function init(newSettings) {
    settings = newSettings;
}

function channelMessage(from, to, message) {
    runScriptInChat(this.client, to, message);
}

function pm(from, message) {
    runScriptInChat(this.client, from, message);
}

module.exports = {
    "message#": channelMessage,
    pm: pm
};