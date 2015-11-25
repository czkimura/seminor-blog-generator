var gulp = require('gulp')
    , sass = require('gulp-sass')
    , autoprefixer = require('gulp-autoprefixer')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify')
    , ngConfig = require('gulp-ng-config')
    , ngAnnotate = require('gulp-ng-annotate')
    , ngTemplatecache = require('gulp-angular-templatecache')
    , plumber = require('gulp-plumber')
    , _ = require('lodash')
    , del = require('del')
    , serve = require('gulp-webserver');

var definitions = {
  ngModuleName: 'swBlogGenerator',
  servePort: 3800
}

gulp.task('clean:dist', function() {
  return del([
    'dist/**/*'
  ]);
});

gulp.task('sass', function() {
  var srcList = [
    'src/scss/**/*.scss'
  ]
  return gulp.src(srcList)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/sass'))
});

gulp.task('css', ['sass'], function() {
  var srcList = [
    'dist/sass/*.css'
  ]
  return gulp.src(srcList)
    .pipe(plumber())
    .pipe(concat('main.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'))
    .pipe(gulp.dest('./sample/css'))
});

gulp.task('ngTpl', function() {
  var srcList = [
    'src/js/templates/**/*.html'
  ]
  return gulp.src(srcList)
    .pipe(plumber())
    .pipe(ngTemplatecache({
      module: definitions.ngModuleName,
      root: 'templates'
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('ngConfig', function() {
  var srcList = [
    'src/js/configures/**/*.json'
  ];
  return gulp.src(srcList)
    .pipe(plumber())
    .pipe(ngConfig(definitions.ngModuleName, {
      createModule: false
    }))
    .pipe(gulp.dest('./dist/configures'))
});

gulp.task('js', ['ngConfig', 'ngTpl'], function() {
  var srcList = {
    lib: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/handlebars/handlebars.min.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/ng-lodash/build/ng-lodash.min.js',
    ],
    app: [
      'src/js/app.js',
      'dist/templates.js',
      'dist/configures/**/*.js',
      'src/js/**/*.js'
    ]
  }
  gulp.src(srcList.lib)
    .pipe(plumber())
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./dist')).on('end', function() {
      gulp.src(srcList.app)
        .pipe(plumber())
        .pipe(concat(definitions.ngModuleName + '.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('./dist')).on('end', function() {
          gulp.src(['dist/lib.js', 'dist/' + definitions.ngModuleName + '.js'])
            .pipe(plumber())
            .pipe(concat('main.js'))
            .pipe(gulp.dest('./sample/js'));
        });
    });
})

gulp.task('watch', function() {
  var watcher = gulp.watch('src/**/*.*', ['js', 'css']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('serve', function() {
  gulp.src('sample')
    .pipe(serve({
      livereload: true,
      port: definitions.servePort
    }));
});
