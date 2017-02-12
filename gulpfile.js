'use strict';

var gulp = require('gulp');
var isparta = require('isparta'); // needed for istanbul reporter to understand ES6
var runSequence = require('run-sequence'); // ability to run tasks in a sequence
var gulpClean = require('gulp-clean');
var gulpIstanbul = require('gulp-istanbul');
var babel = require('babel-core/register');
var gulpMocha = require('gulp-mocha');
var gulpEslint = require('gulp-eslint');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackConfigDev = require('./webpack.config.dev.js');
var webpackConfigProd = require('./webpack.config.prod.js');
var gulpUtil = require('gulp-util');

const IGNORE_DIR = ['!build/**', '!coverage/**', '!node_modules/**'];

const TASKS = {
  startWebpackDevServer: 'startWebpackDevServer',
  build: 'build',
  testCoverage: 'coverage',
  test: 'test',
  testWatch: 'testWatch',
  coverageClean: 'coverage:clean',
  coverageInstrument: 'coverage:instrument',
  coverageReport: 'coverage:report',
  eslint: 'eslint'
};

// Task to start webpack server (used for development)
gulp.task(TASKS.startWebpackDevServer, function (done) {
  // Start a webpack-dev-server
  new webpackDevServer(webpack(webpackConfigDev), {
    contentBase: 'src/',
    historyApiFallback: true,
    hot: true,
    progress: true,
    stats: {
      colors: true
    }
  }).listen(webpackConfigDev.port, 'localhost', function (err) {
    if (err) {
      throw new gulpUtil.PluginError('webpack-dev-server', err);
    }

    gulpUtil.log(TASKS.startWebpackDevServer, 'http://localhost:' + webpackConfigDev.port);
  });
});

// Runs webpack to create /build/index.html, /build/styles.sass, /build/bundle.js
gulp.task(TASKS.build, function (done) {
  // run webpack
  webpack(webpackConfigProd, function (err, stats) {
    if (err) throw new gulpUtil.PluginError(TASKS.build, err);
    gulpUtil.log(TASKS.build, stats.toString({
      colors: true,
      errorDetails: true
    }));
    done();
  });
});

// Test task
gulp.task(TASKS.test, function (done) {
  return gulp
    .src(['./test/**/*.js'].concat(IGNORE_DIR),
      {
        read: false
      }
    )
    .pipe(gulpMocha({
      compilers: {
        js: babel
      },
      recursive: true,
      reporter: 'spec',
      require: ['ignore-styles', './test/.setup.js'],
      ui: 'bdd'
    }))
    .once('error', function (err) {
      gulpUtil.log(err.toString({
        colors: true,
        errorDetails: true
      }));
      
      // Exit when a test fails only when doing builds for production
      if (process.env.BABEL_ENV === 'production') {
        process.exit(1);
      }
    });
});

// Task for watching unit tests
gulp.task(TASKS.testWatch, function () {
  gulp.watch(['src/js/**/*.js', 'test/**/*.js'], [TASKS.test]);
});

// Run unit tests with code coverage
gulp.task(TASKS.testCoverage, function (done) {
  runSequence(TASKS.coverageInstrument, TASKS.test, TASKS.coverageReport, done);
});

// Cleanup old coverage report
gulp.task(TASKS.coverageClean, function () {
  return gulp
    .src(['coverage/*'], {
      read: false
    })
    .pipe(gulpClean({
      force: true
    }));
});

// Instrument files using istanbul and isparta
gulp.task(TASKS.coverageInstrument, [TASKS.coverageClean], function () {
  return gulp.src(['./src/**/*.js'].concat(IGNORE_DIR))
    // Covering files
    .pipe(gulpIstanbul({
      compilers: {
        js: babel
      },
      includeUntested: true,
      instrumenter: isparta.Instrumenter, // Use the isparta instrumenter (code coverage for ES6)
      instrumenterOptions: {
        isparta: {
          babel: {
            presets: ['es2015', 'react']
          }
        }
      }
    }))
    .pipe(gulpIstanbul.hookRequire()); // Force `require` to return covered files
});

// Write coverage reports after test success
gulp.task(TASKS.coverageReport, function () {
  return gulp
    .src(['./src/**/*.js'].concat(IGNORE_DIR), {read: false})
    // Istanbul configuration (see https://github.com/SBoudrias/gulp-istanbul#istanbulwritereportsopt)
    .pipe(gulpIstanbul.writeReports({
      dir: './coverage',
      reporters: ['html', 'text']
    }));
});

// Task for ESLint
gulp.task(TASKS.eslint, function () {
  return gulp
    .src(['./src/**/*.js'].concat(IGNORE_DIR))
    .pipe(gulpEslint({
      'useEslintrc': true
    }))
    .pipe(gulpEslint.formatEach('stylish'))
    // Brick on failure to be super strict
    .pipe(gulpEslint.failAfterError());
});
