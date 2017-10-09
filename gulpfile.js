var ENV = process.env.APP_ENV || 'development';

if( ENV === 'development' ) {
    require('dotenv').config();
}

var package = require('./package.json');

var b2v = require('buffer-to-vinyl');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var merge = require('merge');
var rename = require('rename');
var source = require('vinyl-source-stream');
var sourceMaps = require('gulp-sourcemaps');
var watchify = require('watchify');
var serve = require('gulp-serve');
var del = require('del');
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

var ngConfig = require('gulp-ng-config');
var Server = require('karma').Server;

// let's load our ENV variables
var config = require('./config/config.js');
gutil.log('-->CURRENT ENVIRONMENT: ' + ENV );



/*
var browserSync = require('browser-sync').create();

//var karma = require('gulp-karma');
var glob = require('glob');
var fs = require('fs');
var flatten = require('gulp-flatten');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');

var autoprefixer = require('gulp-autoprefixer');

var ngAnnotate = require('gulp-ng-annotate');
//var ngAnnotate = require('browserify-ngannotate');
*/


//var Cachebust = require('gulp-cachebust');
//var cachebust = new Cachebust();



var paths = {
    test: 'test/',
    src: 'src/',
    build: './build/',
    maps: './maps/',
    source : {
        test: 'test/',
        path: 'src/',
        css: 'src/assets/css/'
    },
    dest : {
        path: './build',
        css: 'build/assets/css/',
        maps: './maps'
    }
};

var buildConfig = {
    js: {
        src: 'src/app/app.module.js', // app file entry point
        mapDir: paths.maps, // dir where to save maps to
        outputDir: paths.build, // dir to save bundle to
        outputFile: 'bundle.js' // bundle file
    }
};

 var bundler = browserify({
                        entries: [buildConfig.js.src],
                        cache: {},
                        packageCache: {},
                        plugin: [watchify]
        });

function bundle() {
    bundler
        .bundle()   // start bundle
        .pipe(source(buildConfig.js.outputFile))   // entry point
        .pipe(buffer())   // Convert to gulp pipeline                 
   //     .pipe(rename(buildConfig.js.outputFile))    // Rename output from 'app.module.js'
        
        .pipe(sourceMaps.init({ loadMaps : true }))  // Strip inline source maps
        .pipe(sourceMaps.write(buildConfig.js.mapDir))    // Save source maps to their own directory
        
        .pipe(gulp.dest(buildConfig.js.outputDir))        // Save 'bundle' to build/
        .pipe(livereload());       // Reload browser if relevant
}

gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('bundle', ['ng-config'],  function() {

       // var bundler = browserify( buildConfig.js.src ); // pass browserify the entry point
                       // .transform(xxxx)  // chain transformations...
                       // .transform(yyyy)
       

        bundler.on('update', bundle );

        bundle( ); // Chain other options -- sourcemaps, rename, etc.
});

gulp.task('ng-config', function() {
  var json = JSON.stringify(config[ENV]);

  return b2v.stream(new Buffer(json), 'app.constants.js')
    .pipe(ngConfig('app.constants', { constants: config[ENV], createModule:true }))
    .pipe(gulp.dest('./src/app'));
});


gulp.task('lint', function() {
    gulp.src('./src/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build', [ 'clean', /*'lint',*/ 'bundle', 'test'], function() {
});


//gulp.task('watch', function() {
//  livereload.listen( { 
//      port: 9090,
//      server: 'localhost'
//  });
//  gulp.watch('./src/app/**/*.*', ['build']);
//});


//gulp.task('serve', ['build'], serve({
//        root: ['build'],
//        port: 9090
//}));

gulp.task('js-watch', ['build'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('serve', ['build' , 'sass', 'static' ], function() {
    
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        port: 8080,
        browser: 'chrome'
    });

    gulp.watch("src/assets/css/*.scss", ['sass']);
    gulp.watch('src/*.html', ['static']);
    gulp.watch('src/assets/**/*.*', ['static']);
    gulp.watch("src/app/**/*.*", ['js-watch']); //.on('change', browserSync.reload);
  //  gulp.watch("./src/app/**/*.*").on('change', browserSync.reload);
});
// gulp.task('browserify', function() {
// //    var b = browserify( {
// //         entries: './src/app/app.module.js',
// //        debug: true,
// //       // paths: ['./js/controllers', './js/services', './js/directives'],
// //        transform: [ngAnnotate]
// //    });
//   return browserify('./src/app/app.module.js')
//           .bundle()
//           .pipe( source('main.js') )
//             .pipe(ngAnnotate())
//           .pipe(buffer())
//         //  .pipe(cachebust.resources())
//         //  .pipe( uglify() )
//         //  .pipe( minify( {
//         //        ignoreFiles: '*.spec.js'
//         //   }))
//           .pipe( gulp.dest('./public/') );


// });

// //
// //gulp.task('browserify-tests', function () {
// //  var bundler = browserify({debug: true});
// //  glob
// //  .sync(paths.src + '**/*.spec.js')
// //  .forEach(function (file) {
// //    bundler.add(file);
// //  });
// //  return bundler
// //  .bundle()
// //  .pipe(source('browserified_tests.js'))
// //  .pipe(gulp.dest(paths.test + 'browserified'));
// //});

 gulp.task('karma' , function (done) {

     new Server({
         configFile: __dirname + '/test/karma.conf.js',
         singleRun: true
     }, function() {
        done()
     }).start();

     

// //    var testFiles = [
// //        './src/**/*.spec.js'
// //    ];
// //
// //    return gulp.src(testFiles)
// //        .pipe(karma({
// //            configFile: './test/karma.conf.js',
// //            action: 'run'
// //    }))
// //    .on('error', function(err) {
// //        console.log('karma tests failed: ' + err);
// //        throw err;
// //    });

 });

 gulp.task('test', ['karma']);

 gulp.task('sass', function() {
   return gulp.src( paths.source.css + '*.scss')
//   // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
           .pipe(sass({onError: function(e) { console.log(e); } }))
//   .pipe(cachebust.resources())
//   // Optionally add autoprefixer
//   //.pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
//   // These last two should look familiar now :)
           .pipe(gulp.dest( paths.dest.css ))
           .pipe(browserSync.stream());
 });

 gulp.task('static', function() {
       gulp.src(['./src/**/*.html', './src/**/*.*', './src/**/*.css', '!./src/**/*.scss'])
  //       .pipe(cachebust.references())
         .pipe(gulp.dest('./build'))
 		.pipe(browserSync.stream())
 });

gulp.task('vendor', function() {

});


// gulp.task('serve', ['build'], function () {
//   browserSync.init({
//     server: {
//       baseDir: "./public",
//       // The key is the url to match
//       // The value is which folder to serve (relative to your current working directory)
//       routes: {
//         //"/bower_components": "bower_components",
//         "/node_modules": "node_modules"
//       }
//     },
//     port: 8080,
//     ui: {
//         port: 8081,
//         weinre: {
//             port: 9090
//         }
//     },
//     browser: "chrome"
//   });
// });

// gulp.task('copy', ['browserify', 'sass'], function() { //'ng-config', 'assets', 'i18n'], function() {
//     gulp.src(['./src/**/*.html', './src/**/*.*', './src/**/*.css', '!./src/**/*.scss'])
//         .pipe(cachebust.references())
//         .pipe(gulp.dest('./public'))
// 		.pipe(browserSync.stream())
// });

// gulp.task('flags', function() { //'ng-config', 'assets', 'i18n'], function() {
//     gulp.src(['./src/assets/flag-icon-css/**/*.svg'])
//         .pipe(cachebust.references())
//         .pipe(gulp.dest('./public/assets/flag-icon-css'))
// 		.pipe(browserSync.stream())
// });

// gulp.task('i18n', function() {
//     gulp.src(['./src/app/i18n/**/*.json'])
//         .pipe(gulp.dest('./public/i18n/'))
//         .pipe(browserSync.stream())
// });

// gulp.task('scripts', function() {
//    gulp.src('./src/assets/js/*.js')
//     .pipe(concat('vendor.min.js'))
//    .pipe(cachebust.resources())
//     .pipe(gulp.dest('./public/assets/js'));
// });

// gulp.task('build', [ /*'lint',*/ 'ng-config', 'sass', 'copy', 'i18n', 'scripts', 'test' ]/*, function() {
//     return gulp.src('index.html')
//         .pipe(cachebust.references())
//         .pipe(gulp.dest('./public'))
// }*/);



// gulp.task('watch', ['build'], function (done) {
//     browserSync.reload();
//     done();
// });

// gulp.task('default', ['serve'], function(){
//     gulp.watch(['./src/**/*.html', './src/**/*.js', './src/**/*.css', './src/**/*.json'], ['watch']);
//     //gulp.watch("./public/**/*.*").on('change', browserSync.reload);
// });
