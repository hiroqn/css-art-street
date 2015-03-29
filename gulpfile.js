'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('styles', function () {
    return gulp.src('app/styles/styles.less')
        .pipe($.less({
            paths: ['app/styles']
        }))
        .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('jade', function () {
    return gulp.src('app/index.jade')
        .pipe($.jade({
            locals: {}
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['jade', 'styles'], function (cb) {
    browserSync({
        files: 'dist/**/*',
        server: {
            baseDir: ['dist']
        },
        open: true
    }, cb);
    gulp.watch(['app/**/*.jade'], ['jade',  browserSync.reload]);
    gulp.watch(['app/**/*.less'], ['styles', browserSync.reload]);
});

gulp.task('default', ['jade', 'styles'], function (cb) {
  cb();
});
