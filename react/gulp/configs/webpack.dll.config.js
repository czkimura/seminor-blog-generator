var path = require('path');
var webpack = require('webpack');
var conf = require('./config');

var rootDir = path.join(__dirname, '../../');
var distDir = path.join(rootDir, conf.tmp, 'dll');

module.exports = {
  entry: {
    vendor: (function (json) {
      return Object.keys(json.dependencies);
    })(require(path.join(rootDir, 'package.json'))),
  },
  output: {
    path: distDir,
    filename: '[name].dll.js',
    library: '[name]_dll',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.DllPlugin({
      path: path.join(distDir, '[name].manifest.json'),
      name: '[name]_dll',
    }),
  ]
};
