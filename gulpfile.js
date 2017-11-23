require('dotenv').config();

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var b2v = require('buffer-to-vinyl');
var source = require('vinyl-source-stream');
var sourceMaps = require('gulp-sourcemaps');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var ngConfig = require('gulp-ng-config');

var ENV = process.env.APP_ENV || 'development';

/* TASK TEMPLATE

gulp.task('taskName', function() {
   return gulp.src('source-file')
    .pipe(aGulpPlugin())
    .pipe(gulp.dest('destination'));
});

gulp.watch('files-to-watch', ['tasks', 'to', 'run']);

*/

var CONFIG = {
    dest: {

    },
    browserSync: {
        port: 8000,
        browser: 'chrome'
    },
    assets: [
        'js/**/*',
        'flag-icon-css/**/*.*',
        'font-awesome/**/*.*',
        'css/**/*.css'
    ],
    partials: {
        sources : [
            'src/**/*.html',
            'src/**/*.json',
            '!src/index.html'
        ]
    }
}

gulp.task('ng-config', function() {
    var config = require('./config/config.js');
    var json = JSON.stringify(config[ENV]);
  
    return b2v.stream(new Buffer(json), 'app.constants.js')
      .pipe(ngConfig('app.constants', { constants: config[ENV], createModule:true }))
      .pipe(gulp.dest('src/app'));
  });


gulp.task('sass', function () {
    return gulp.src('src/assets/scss/**/*.scss')
        .pipe(sass({ onError: function (e) { console.log(e); } }))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})



gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'build'
        }/*,
      port: CONFIG.browserSync.port,
      browser: CONFIG.browserSync.browser
      */
    })
})

var bundler = null;

function bundle() {
    bundler
        .bundle()   // start bundle
        .pipe(source('bundle.js'))   // entry point
        .pipe(buffer())   // Convert to gulp pipeline                 
        //     .pipe(rename(buildConfig.js.outputFile))    // Rename output from 'app.module.js'

        .pipe(sourceMaps.init({ loadMaps: true }))  // Strip inline source maps
        .pipe(sourceMaps.write('./maps'))    // Save source maps to their own directory

        .pipe(gulp.dest('./build'));        // Save 'bundle' to build/
    //  .pipe(livereload());       // Reload browser if relevant
}

gulp.task('browserify', function (done) {
    bundler = browserify({
        entries: ['src/app/app.module.js'],
        cache: {},
        package: {} //,
        //plugin: [watchify]
    });

    bundler.on('update', bundle);

    bundle();

    done();

})

gulp.task('useref', function () {
    return gulp.src('src/*.html')
        .pipe(useref())
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('build'))
});

gulp.task('images', function () {
    return gulp.src('src/assets/images/**/*.+(png|jpg|gif|svg)')
        //.pipe((imagemin()))
        .pipe(imagemin())
        .pipe(gulp.dest('build/assets/images'))
});

gulp.task('fonts', function () {
    return gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('build/assets/fonts'));
})

gulp.task('clean:build', function () {
    return del.sync('build');
})

gulp.task('cache:clear', function (callback) {
    // return cache.clearAll(callback);
})


gulp.task('partials', function() {
    console.log("eseguo task partials");
    var sources = [
                'src/**/*.html',
                'src/**/*.json',
                '!src/index.html'
    ];
    return gulp.src( sources )
        .pipe(gulp.dest('build'));
})

gulp.task('assets', function() {
    return gulp.src(CONFIG.assets, { base: 'src/assets', cwd: 'src/assets/**' })
        .pipe(gulp.dest('build/assets'));
})


gulp.task('build', function (callback) {
    runSequence('clean:build', [ 'ng-config', 'sass', 'useref', 'images', 'fonts', 'assets', 'partials', 'browserify'], callback);
})

gulp.task('default', function (callback) {
    runSequence([ 'ng-config', 'sass', 'partials', 'browserify', 'browserSync', 'watch'], callback);

})

gulp.task('watch', [ 'sass', 'browserify', 'browserSync' ], function () {
    gulp.watch('src/assets/scss/**/*.scss', ['sass'], function() {
        browserSync.reload({ stream: true });
    });

    gulp.watch('src/*.html', ['useref'], function() {
        browserSync.reload({ stream: true });
    });
    gulp.watch('src/assets/fonts/**/*.*', ['fonts'], function() {
        browserSync.reload({ stream: true });
    })
    gulp.watch( ['src/**/*.html', 'src/**/*.json','!src/index.html'], function() {
        runSequence(['partials'], browserSync.reload);
    })
    gulp.watch('src/**/*.js', ['browserify'], function () {

        browserSync.reload({ stream: true });
    });

})

gulp.task('browser-reload', function() {browserSync.reload({stream:true})});
