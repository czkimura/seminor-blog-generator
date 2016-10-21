require('dotenv').config(require('./gulp/configs/dotenv.config'));

var argv        = require('./gulp/libs/argv');
var gulp        = require('gulp');
var requireDir  = require('require-dir');
var runSequence = require('run-sequence');

requireDir('./gulp/tasks', { recurse: true });

gulp.task('pre-build', function (cb) {
  return runSequence(
    'del',
    [
      'scripts', 'styles', 'vendors'
    ],
    cb
  );
});

gulp.task('default', function (cb) {
  return runSequence(
    'pre-build',
    function () {
      if (argv.serve) {
        gulp.start('serve');
      }

      cb();
    }
  );
});

gulp.task('build', function (cb) {
  return runSequence(
    ['del:dist', 'del:libs'],
    [
      'scripts:build', 'styles:build'
    ],
    cb
  );
});
