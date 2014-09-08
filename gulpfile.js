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
    html: ['templates/*.html', '!index.html'],
    css: ['styles/*.css']
};

gulp.task('default', ['scripts', 'html','css']);

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

gulp.task('css', function () {
    console.log('processing html\'s...');
    gulp.src(paths.css)
        .pipe(cssmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/styles'))
});


