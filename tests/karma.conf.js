const webpackConfig = require( './webpack.config' );

module.exports = function( config ) {
    config.set( {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'mocha',
            'chai',
            'sinon'
        ],

        // list of files / patterns to load in the browser
        files: [
            './**/*.ts'
        ],

        // list of files to exclude
        exclude: [],

        mime: {
            'text/x-typescript': [ 'ts' ]
        },

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './**/*.ts': [ 'webpack' ]
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'mocha'
        ],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            // 'Chrome',
            'PhantomJS'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        plugins: [
            require( 'karma-webpack' ),
            require( 'karma-mocha' ),
            require( 'karma-chai' ),
            require( 'karma-sinon' ),
            require( 'karma-chrome-launcher' ),
            require( 'karma-phantomjs-launcher' ),
            require( 'karma-mocha-reporter' )
        ],

        webpack: {
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        exclude: '/node_modules/',
                        use: [
                            {
                                loader: 'ts-loader'
                            }
                        ]
                    }
                ]
            },
            resolve: {
                extensions: [ '.ts', '.js' ],

                // For simplified usage in examples, eg. import { Engine } from 'ash';
                alias: {
                    ash: '../src/ash'
                }
            }
        }
    } );
};