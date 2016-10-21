var gulp           = require('gulp');
var gutil          = require('gulp-util');
var mainBowerFiles = require('main-bower-files');
var concat         = require('gulp-concat');
var watch          = require('gulp-watch');
var batch          = require('gulp-batch');
var bs             = require('browser-sync');
var plumber        = require('../libs/plumber');
var argv           = require('../libs/argv');
var conf           = require('../configs/config');

gulp.task('vendors:scripts', function () {
  // bowerのmeinファイル一覧取得
  var files = mainBowerFiles({
    filter: '**/*.js',
    /* overrides dependencies
    overrides: {
      angular: {
        dependencies: {
          jquery: '*'
        }
      }
    }
    */
  });

  gutil.log(gutil.colors.blue('bower scripts\n'), files);

  return gulp.src(files)
    .pipe(plumber())
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(conf.tmp + '/scripts'));
});

gulp.task('vendors:styles', function () {
  // bowerのmeinファイル一覧取得
  var files = mainBowerFiles({
    filter: '**/*.css',
    overrides: {
      'mdi': {
        ignore: true
      }
    }
  });

  gutil.log(gutil.colors.blue('bower styles\n'), files);

  return gulp.src(files)
    .pipe(plumber())
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest(conf.tmp + '/styles'));
});

gulp.task('vendors', ['vendors:scripts', 'vendors:styles'], function () {
  if (argv.watch) {
    watch('bower_components/**/*.js', batch(function (e, cb) {
      gulp.start('vendors:scripts', function () {
        bs.reload();
        cb();
      });
    }));

    watch('bower_components/**/*.css', batch(function (e, cb) {
      gulp.start('vendors:styles', function () {
        bs.reload();
        cb();
      });
    }));
  }
});
