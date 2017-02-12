'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, ''),
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/index.js')
  ],
  output: {
    filename: 'bundle.js',
    hash: true,
    path: path.join(__dirname, '/build/'),
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel', 'eslint'],
      },
      {
        test: /\.sass|scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?outputStyle=expanded")
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      hash: true, // Append a unique compilation hash to all included scripts and css files
      inject: 'body', // Inject all scripts into the body
      template: 'src/index.ejs', // Load a custom template
      title: 'React boilerplate' // Set page title
    })
  ],
  resolve: {
    root: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    // this is needed because react-hot-loader tries to load it from 'react'
    // but with version 15.4.x, it was removed and only 'react-dom' has it
    alias: {
      'react/lib/ReactMount': 'react-dom/lib/ReactMount',
    }
  }
};
