module.exports = function(grunt) {
    // Pull Grunt plugins from the package.json file
    // These plugins provide necessary tasks.
    require('load-grunt-config')(grunt);
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        // Task configuration.

        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './'
                }
            }
        },
        ts: {
            default: {
                src: ["js/**/*.ts", "!node_modules/**"]
            }
        },
        typescript: {
            base: {
                src: ['js/**/*.ts'],
                dest: 'js/kioskui.js',
                options: {
                    module: 'commonjs',
                    target: 'es5'
                }
            }
        },
        clean: {
            build: {
                src: ['~dist']
            },
            stylesheets: {
                src: ['~dist/**/*.css', '!~dist/application.css']
            },
            scripts: {
                src: ['~dist/**/*.js', '!~dist/application.js']
            }
        },
        concat: {
            options: {
                banner:'',
                stripBanners: true
            },
            dist: {
                src: ['js/kioskui.js','js/**/*.js', '!js/**/*.js.map', '!js/**/*.ts'],
                dest: '~dist/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '',
                sourceMap: true,
                compress: {
                    pure_funcs: ['console.log']
                } 
            },
            build: {
                files: [{
                    expand: true,
                    src: 'js/**/**/*.js',
                    dest: '~dist'
                }]
              }
        },
        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                smarttabs: true,
                laxcomma: true,
                laxbreak: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: 'imgs/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '~dist/imgs/'
                }]
            }
        },
        uncss: {
            dist: {
                files: [{
                    src: '**/*.html',
                    dest: '~dist/css/clean.css'
                }]
            }
        }

        ,
        cssmin: {
            dist: {
                options: {
                    processImport: true,
                    keepSpecialComments: 0,
                    banner: '/*! Kiosk UI | Uniguest, Inc Uniguest.com */'
                },
                files: {
                    '~dist/css/styles.min.css': ['css/**/*.css']
                }
            }
        }

        ,
        copy: {
            main: {
                files: [{
                        cwd: '',
                        src: ['./index.html'],
                        dest: '~dist',
                        expand: true
                    }, {
                        cwd: '',
                        src: ['css/styles.css'],
                        dest: '~dist',
                        expand: true
                    },
                    {
                        cwd: '',
                        src: ['js/plugins/**'],
                        dest: '~dist',
                        expand: true
                    },
                    {
                        cwd: '',
                        src: ['js/components/**', '!js/components/*.js.map', '!js/components/*.ts'],
                        dest: '~dist',
                        expand: true
                    },
                    {
                        cwd: '',
                        src: ['js/services/**', '!js/services/*.js.map', '!js/services/*.ts'],
                        dest: '~dist',
                        expand: true
                    },
                    {
                        cwd: '',
                        src: ['json/**'],
                        dest: '~dist',
                        expand: true
                    },
                    {
                        cwd: '',
                        src: ["node_modules/systemjs/dist/system.js"],
                        dest: '~dist',
                        expand: true
                    },
                    {
                        cwd: '',
                        src: ["node_modules/plugin-typescript/lib/plugin.js"],
                        dest: '~dist',
                        expand: true
                    },
                    {
                        cwd: '',
                        src: ["node_modules/typescript/lib/typescript.js"],
                        dest: '~dist',
                        expand: true
                    },
                    {
                        cwd: '',
                        src: ["node_modules/bootstrap/dist/css/bootstrap.min.css"],
                        dest: '~dist',
                        expand: true
                    },
                    {
                        cwd: '',
                        src: ["node_modules/systemjs-plugin-css/css.js"],
                        dest: '~dist',
                        expand: true
                    },
                    {
                        cwd: '',
                        src: ["node_modules/jquery/dist/jquery.min.js"],
                        dest: '~dist',
                        expand: true
                    },
                    {
                        cwd: '',
                        src: ["node_modules/systemjs/dist/system.js"],
                        dest: '~dist',
                        expand: true
                    }
                ],
            },
        },
        processhtml: {
            dist: {
                options: {
                    process: true,
                    data: {
                        title: 'Kiosk Ui - Uniguest, Inc.',
                        message: ''
                    }
                },
                files: {
                    '~dist/index.html': ['index.html']
                }
            }
        },
        autoprefixer: {
            build: {
                expand: true,
                cwd: 'build',
                src: ['**/*.css'],
                dest: 'build'
            }
        },
        watch: {
            files: '**/*.ts',
            tasks: ['typescript']
        },
        open: {
            dev: {
                path: 'http://localhost:8080/index.html'
            }
        }
    });
//, 'concat'
    grunt.registerTask('default', ['connect', 'open', 'watch']);
    grunt.registerTask('build', ['clean', 'typescript', 'jshint', 'cssmin', 'uglify', 'imagemin', 'processhtml', 'copy']);
};