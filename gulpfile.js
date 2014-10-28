/**
 * Created by Edxe on 9/7/14.
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    cssmin = require('gulp-cssmin');

var streamqueue = require('streamqueue');
var angularTemplates = require('gulp-angular-templates');
var rename = require('gulp-rename');

var paths = {
    scripts: ['script/*.js', '!gulpfile.js'],
    html: ['templates/*.html', '!index.html'],
    css: ['styles/*.css']
};

gulp.task('default', ['scripts','css']);

gulp.task('scripts', function () {
    console.log('processing scripts...');
    /*gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat("angularFormElements.js"))
        .pipe(gulp.dest('dist/script'));

    gulp.src(paths.html)
        .pipe(angularTemplates({"module":"angularFormElements","basePath":"templates/"}))
        .pipe(concat("angularFormElements.js"))
        .pipe(gulp.dest('dist/script'));*/

    return streamqueue({ objectMode: true },
        gulp.src(paths.scripts),
        gulp.src(paths.html).pipe(angularTemplates({"module":"angularFormElements","basePath":"templates/"}))
    )
        .pipe(uglify())

        .pipe(concat("angularFormElements.js"))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/script'));

});

gulp.task('css', function () {
    console.log('processing html\'s...');
    gulp.src(paths.css)
        .pipe(cssmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/styles'))
});



