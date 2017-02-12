'use strict';

// webpack config for production

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

// modify some webpack config options
var webpackConfigProd = Object.create(webpackConfig);

webpackConfigProd.plugins = webpackConfigProd.plugins.concat(
  new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
);

module.exports = webpackConfigProd;
