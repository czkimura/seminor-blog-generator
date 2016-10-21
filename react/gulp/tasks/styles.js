var gulp     = require('gulp');
var gutil    = require('gulp-util');
var sass     = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var ap       = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename   = require('gulp-rename');
var watch    = require('gulp-watch');
var batch    = require('gulp-batch');
var bs       = require('browser-sync');
var plumber  = require('../libs/plumber');
var argv     = require('../libs/argv');
var conf     = require('../configs/config');

gulp.task('styles:compile', function () {
  return gulp.src([conf.src + '/styles/**/*.scss', '!' + conf.src + '/styles/**/_*.scss'])
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(ap())
    .pipe(gulp.dest(conf.tmp + '/styles'))
    .pipe(gulp.dest(conf.dist + '/styles'));
});

gulp.task('styles:build', function () {
  return gulp.src([conf.src + '/styles/**/*.scss', '!' + conf.src + '/styles/**/_*.scss'])
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(ap())
    .pipe(gulp.dest(conf.dist + '/styles'))
    .pipe(cleanCSS())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(conf.dist + '/styles'));
});

gulp.task('styles', ['styles:compile'], function () {
  if (argv.watch) {
    watch(conf.src + '/styles/**/*.scss', batch(function (e, cb) {
      gulp.start('styles:compile', function () {
        bs.reload('*.css');
        cb();
      });
    }));
  }
});
