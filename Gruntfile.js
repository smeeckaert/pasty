module.exports = function (grunt) {

    function runElectronApp(path, env) {
        if (!env) {
            env = {};
        }
        const electron = require('electron-prebuilt');
        const options = {
            env  : process.env,
            stdio: 'inherit'
        };
        return spawn(electron, [path], options);
    }

    grunt.initConfig({
        sass    : {
            options: {
                sourceMap: true
            },
            dist   : {
                files: {
                    'static/css/style.css': 'assets/sass/style.scss'
                }
            }
        },
        uglify  : {
            options  : {
                "separator": ";"
            },
            my_target: {
                files: {
                    "static/js/main.min.js" : [
                        "assets/js/main.js"
                    ],
                    "static/js/build.min.js": [
                        "assets/js/**/*.js",
                        "!assets/js/main.js"
                    ]
                }
            }
        },
        assemble: {
            // Task-level options.
            options: {
                flatten : true,
                assets  : 'dist/assets',
                layout  : 'template/layout/default.hbs',
                partials: 'template/partial/*.hbs'
            },
            // Templates to build into pages
            pages  : {
                files: {
                    'dist/': ['template/page/*.hbs']
                }
            }
        },
        run     : {
            options    : {
                // Task-specific options go here.
            },
            pasty: {
                cmd    : 'npm',
                args   : [
                    'start'
                ],
                options: {
                    wait: false
                }
            }
        },
        watch   : {
            sass    : {
                files: ['assets/**/*.scss'],
                tasks: ['sass']
            },
            uglify  : {
                files: ['assets/**/*.js'],
                tasks: ['uglify']
            },
            assemble: {
                files: ['template/**/*.hbs'],
                tasks: ['assemble']
            }
        }
    });
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('default', ['run', 'watch' ]);

};