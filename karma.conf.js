// Karma configuration
// Generated on Tue Jul 31 2018 13:00:39 GMT+0200 (Central European Summer Time)

const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      // This is required for PhantomJS
      require.resolve('core-js/shim'),

      'test/**/*.spec.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        [require.resolve('core-js/shim')]: ['webpack'],

        'test/**/*.spec.js': ['webpack'],
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  configFile: path.resolve('./test/tsconfig.es5.json'),
                  logInfoToStdOut: true,
                },
              },
            ],
          },
        ],
      },

      plugins: [
        new HardSourceWebpackPlugin(),
      ],
    },
    webpackMiddleware: {
        noInfo: true,
        stats: "errors-only"
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
