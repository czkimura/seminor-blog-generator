var path         = require('path');
var webpack      = require('webpack');
var DotEnvPlugin = require('webpack-dotenv-plugin');
var argv         = require('../libs/argv');
var conf         = require('./config');

module.exports = function config() {
  return {
    watch : argv.watch,
    devtool: 'inline-source-map',
    output: {
      // pathinfo: true
      path: path.join(__dirname, '../../' + conf.tmp + '/scripts'),
      filename: '[name].js',
      publicPath: '/'
    },
    entry: {
      app: [
        './'+ conf.src +'/scripts/index.jsx'
      ]
    },
    plugins: (function () {
      var plugins = [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new DotEnvPlugin(require('./dotenv.config')),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
      ];
      if (process.env.NODE_ENV !== 'test') {
        plugins.push(
          new webpack.DllReferencePlugin({
            context: path.join(__dirname, '../../'),
            manifest: require('../../'+conf.tmp+'/dll/vendor.manifest.json'),
          })
        );
      }
      return plugins;
    })(),
    resolve: {
      extensions: ['', '.js', '.json', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /.json$/,
          loader: 'json'
        },
        {
          test: /.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
          },
        },
      ]
    }
  };
};