'use strict';

// webpack config for development

var path = require('path');
var webpack = require('webpack');
var webpackConfig = require("./webpack.config.js");

// modify some webpack config options
var webpackConfigDev = Object.create(webpackConfig);
webpackConfigDev.port = 5000;
webpackConfigDev.debug = true;
webpackConfigDev.devtool = 'eval-source-map';
webpackConfigDev.entry = webpackConfigDev.entry.concat([
  'webpack-dev-server/client?http://localhost:' + webpackConfigDev.port,
  'webpack/hot/only-dev-server',
  path.resolve(__dirname, 'src/index.js')
]);
webpackConfigDev.plugins = webpackConfigDev.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    }
  }),
  new webpack.HotModuleReplacementPlugin()
]);

module.exports = webpackConfigDev;
