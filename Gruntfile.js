"use strict";

var checkConfig = function(grunt) {
    var location = "./settings.js";
    if (!grunt.file.exists(location)) {
        console.log("There is no config file, cloning default settings file");
        var content = grunt.file.read("_settings.js");
        grunt.file.write(location, content);
    }

    var settings = require(location).grunt;

    return settings;
};

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        mochaTest: {
            test: {
                src: 'test/**/*.js',
                options: {
                    slow: 10
                }
            }
        }
    });

    grunt.config.merge(checkConfig(grunt));

    grunt.task.registerTask('test', [
        'mochaTest'
    ]);

    grunt.task.registerTask('default', [
        'test'
    ]);
};