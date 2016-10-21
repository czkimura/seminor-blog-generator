var path     = require('path');
var gulp     = require('gulp');
var addsrc   = require('gulp-add-src');
var webpack  = require('webpack-stream');
var watch    = require('gulp-watch');
var batch    = require('gulp-batch');
var uglify   = require('gulp-uglify');
var bs       = require('browser-sync');
var named    = require('vinyl-named');
var rename   = require('gulp-rename');
var plumber  = require('../libs/plumber');
var argv     = require('../libs/argv');
var conf     = require('../configs/config');
var wpConfig = require('../configs/webpack.config');
var wpDllConfig = require('../configs/webpack.dll.config');

gulp.task('scripts:dll', function (cb) {
  var webpack = require('webpack');
  var compiler = webpack(wpDllConfig);
  compiler.run(function () {
    cb();
  });
});

gulp.task('scripts', ['scripts:dll'], function (cb) {
  // watch + serve の場合は HMR 用のwebpackDevMiddlewareで処理
  if (argv.watch && argv.serve) {
    return cb();
  }

  var called = false;
  var firstBuildReady = false;
  gulp.src([
    conf.src + '/scripts/*'
  ])
    .pipe(plumber())
    .pipe(webpack(wpConfig(), null, function webpackChangeHandler () {
      firstBuildReady = true;
    }))
    .pipe(gulp.dest(conf.tmp + '/scripts'))
    .pipe(gulp.dest(conf.dist + '/scripts'))
    .on('data', function () {
      if (!called && firstBuildReady) {
        called = true;
        cb();
      }
    });
});

gulp.task('scripts:build', [
  'scripts'
]);
