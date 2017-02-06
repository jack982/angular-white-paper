var package = require('./package.json');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var Server = require('karma').Server;
var glob = require('glob');
var fs = require('fs');
var flatten = require('gulp-flatten');
var ngConfig = require('gulp-ng-config');
var config = require('./config/config.js');
var dotenv = require('dotenv');

dotenv.load();
var ENV = process.env.APP_ENV || 'development';
console.log('--> ENVIRONMENT: ' + ENV);
/*
if ( ENV === 'development' ) {
    require('dotenv').load();
}
*/

var paths = {
    test: 'test/',
    src: 'src/'
};

gulp.task('ng-config', function() {
   fs.writeFileSync('./config/app.constants.json', JSON.stringify(config[ENV]));
    gulp.src('./config/app.constants.json')
        .pipe( ngConfig('app.constants', { createModule: true }))
        .pipe( gulp.dest('./src/app/'));
});

gulp.task('browserify', function() {
  return browserify('./src/app/app.module.js')
          .bundle()
          .pipe( source('main.js'))
          .pipe( gulp.dest('./public/'));
});


gulp.task('browserify-tests', function () {
  var bundler = browserify({debug: true});
  glob
  .sync(paths.src + '**/*.spec.js')
  .forEach(function (file) {
    bundler.add(file);
  });
  return bundler
  .bundle()
  .pipe(source('browserified_tests.js'))
  .pipe(gulp.dest(paths.test + 'browserified'));
});

gulp.task('karma', ['browserify-tests'], function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});



gulp.task('serve', ['copy'], function () {
  browserSync.init({
    server: {
      baseDir: "./public",
      // The key is the url to match
      // The value is which folder to serve (relative to your current working directory)
      routes: {
        "/bower_components": "bower_components",
        "/node_modules": "node_modules"
      }
    },
    browser: "chrome"
  });
});

gulp.task('copy', ['browserify', 'ng-config', 'assets', 'i18n'], function() {
    gulp.src(['./src/**/*.html'])
        .pipe(gulp.dest('./public'))
		.pipe(browserSync.stream())
});


gulp.task('assets', function() {
    gulp.src(['./src/assets/**/*'])
        .pipe(gulp.dest('./public/assets/'))
		.pipe(browserSync.stream())
});

gulp.task('i18n', function() {

    //gulp.src(['./src/app/**/*-i18n.json'])
    //    .pipe(flatten())
    //    .pipe(gulp.dest('./public/i18n/'))
    //    .pipe(browserSync.stream())
    //
    gulp.src(['./src/app/i18n/**/*.json'])
    //    .pipe(flatten())
        .pipe(gulp.dest('./public/i18n/'))
        .pipe(browserSync.stream())
});
