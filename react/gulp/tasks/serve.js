var path                 = require('path');
var fs                   = require('fs');
var mkdirp               = require('mkdirp');
var gulp                 = require('gulp');
var history              = require('connect-history-api-fallback');
var bs                   = require('browser-sync');
var webpack              = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var argv                 = require('../libs/argv');
var conf                 = require('../configs/config');
var wpConfig             = require('../configs/webpack.config');

function createMiddleware(cb) {
  var middlewares = [
    history()
  ];

  if (!argv.watch) {
    return cb(middlewares);
  }

  // HMR
  var calledCb = false;
  var config = wpConfig();
  // ファイル追加
  Object.keys(config.entry).forEach(function (key) {
    config.entry[key].push(
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client'
    );
  });
  // プラグイン追加
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  // ローダー追加
  config.module.loaders.unshift([
    {
      test: /\.jsx?$/,
      exclude: /node_modules|bower_components/,
      loader: 'react-hot',
    }
  ]);
  config.module.loaders.push([
    {
      test: /\.jsx?$/,
      exclude: /node_modules|bower_components/,
      loader: 'webpack-module-hot-accept',
    }
  ]);

  var bundler = webpack(config);

  // ファイル出力先ディレクトリ作成
  mkdirp.sync(config.output.path);

  bundler.plugin('done', function (stats) {
    var statsJson = stats.toJson();
    var memoryFs = bundler.outputFileSystem;

    // memory-fsからコピー
    statsJson.chunks.forEach(function (chunk) {
      chunk.names.forEach(function (name) {
        var filepath = path.join(config.output.path, name + '.js');
        fs.writeFileSync(filepath, memoryFs.readFileSync(filepath));
      });
    });

    if (!calledCb) {
      calledCb = true;
      cb(middlewares);
    }
  });
  middlewares.push(
    webpackDevMiddleware(bundler, {
      noInfo: true,
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    }),
    webpackHotMiddleware(bundler)
  );
}

function serve(server) {
  createMiddleware(function (middles) {
    bs.init({
      ghostMode: false,
      server: server,
      open: true,
      middleware: middles
    });
  });
}

gulp.task('serve', function () {
  serve([conf.tmp, conf.src, conf.dist, './']);
});

