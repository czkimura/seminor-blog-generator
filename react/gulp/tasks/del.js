var gulp = require('gulp');
var del  = require('del');
var conf = require('../configs/config');

gulp.task('del', ['del:tmp', 'del:dist', 'del:libs']);

gulp.task('del:libs', function () {
  return del([
    'libs/**/*'
  ]);
});

gulp.task('del:tmp', function() {
  return del([
    conf.tmp + '/**/*'
  ]);
});

gulp.task('del:dist', function() {
  return del([
    conf.dist + '/**/*'
  ]);
});
