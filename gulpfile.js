var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();

gulp.task('browserify', function() {
  return browserify('./src/app/app.module.js')
          .bundle()
          .pipe( source('main.js'))
          .pipe( gulp.dest('./public/'));
});


gulp.task('browser-sync', ['copy'], function () {
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

gulp.task('copy', ['browserify', 'assets'], function() {
    gulp.src(['./src/**/*.html'])
        .pipe(gulp.dest('./public'))
		.pipe(browserSync.stream())
});


gulp.task('assets', function() {
    gulp.src(['./src/assets/**/*'])
        .pipe(gulp.dest('./public/assets/'))
		.pipe(browserSync.stream())
});
