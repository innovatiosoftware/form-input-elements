/**
 * Created by Edxe on 9/7/14.
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    cssmin = require('gulp-cssmin');

var paths = {
    scripts: ['script/*.js', '!gulpfile.js'],
    html: ['templates/*.html', '!index.html']
};

gulp.task('default', ['scripts', 'html']);

gulp.task('scripts', function () {
    console.log('processing scripts...');
    gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(gulp.dest('dist/script'))
});

gulp.task('html', function () {
    console.log('processing html\'s...');
    gulp.src(paths.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/templates'))
});


