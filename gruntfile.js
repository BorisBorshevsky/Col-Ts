module.exports = function (grunt) {

    // load the task 
    grunt.loadNpmTasks("grunt-ts")

    grunt.initConfig({
        ts:{
            debug:{
                options:{
                    target: 'es5',
                    module: 'commonjs',
                    fast: 'never',
                    sourcemap: true,
                    verbose:true
                },
                out: 'out/debug/colts.js',
                src: ["src/app/**/*.ts"],
                reference: "src/app/reference.ts"
            },
            release:{
                options:{
                    target: 'es5',
                    module: 'commonjs',
                    fast: 'never',
                    sourcemap: false,
                    removeComments: true,
                    verbose:true
                },
                out: 'out/release/colts.js',
                src: ["src/app/**/*.ts"],
                reference: "src/app/reference.ts"
            },
            build_tests:{
                options:{
                    target: 'es5',
                    module: 'commonjs',
                    fast: 'never',
                    sourcemap: false,
                    removeComments: true,
                    verbose:true
                },
                out: 'tests/out/coltests.js',
                src: ["src/tests/ColTests.ts"],
                reference: "src/tests/out/reference.ts"
            },
            example_with:{
                options:{
                    target: 'es5',
                    module: 'commonjs',
                    fast: 'never',
                    removeComments: true,
                    verbose:true
                },
                out: 'src/examples/out/withcol.js',
                src: ["src/examples/WithCol.ts"]
            },
            example_without:{
                options:{
                    target: 'es5',
                    module: 'commonjs',
                    fast: 'never',
                    removeComments: true,
                    verbose:true
                },
                out: 'src/examples/out/withoutcol.js',
                src: ["src/examples/WithoutCol.ts"]
            }
        },
        uglify: {
            release: {
                files: {
                    'out/release/colts.min.js': 'out/release/colts.js'
                }
            }
        }
    });



    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask("examples", ["ts:example_with", "ts:example_without"]);

    grunt.registerTask("default", ["ts:debug"]);
    grunt.registerTask("build", ["ts:debug"]);
    grunt.registerTask("build_tests", ["ts:build_tests"]);
    grunt.registerTask("release", ["ts:release", "uglify:release"]);
};
