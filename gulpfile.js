'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('clean', function() {
	return del.sync('build');
});

gulp.task('jade', function() {
  return gulp.src('src/**/*.jade')
  	.pipe(jade())
  	.pipe(gulp.dest('build'))
  	.pipe(browserSync.reload({
		stream:true
	}));
});

gulp.task('stylus', function() {
  return gulp.src('src/**/*.styl')
  	.pipe(stylus({
        'include css': true
    }))
    .pipe(concat('out.css'))
  	.pipe(gulp.dest('build'))
  	.pipe(browserSync.reload({
		stream:true
	}));
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
  	.pipe(gulp.dest('build/fonts'));
});

gulp.task('libs', function() {
  return gulp.src('src/libs/**/*')
  	.pipe(gulp.dest('build/libs'));
});

gulp.task('js', function() {
  return gulp.src('src/**/*.js')
    // .pipe(uglify())
  	.pipe(gulp.dest('build'))
  	.pipe(browserSync.reload({
		  stream:true
    }));
});

gulp.task('icons', function(){
  return gulp.src('src/icons/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('build/icons'))
});

gulp.task('initBrowserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  })
});

gulp.task('watch', ['initBrowserSync', 'jade', 'stylus'], function () {
  gulp.watch('src/**/*.jade', ['jade']);
  gulp.watch('src/**/*.styl', ['stylus']);
  gulp.watch('src/**/*.js', ['js']);
  // gulp.watch('src/**/*.html', browserSync.reload);
  // gulp.watch('src/**/*.css', browserSync.reload);
});

gulp.task('update', ['jade', 'stylus']);
gulp.task('default', ['clean', 'js', 'fonts', 'libs', 'icons', 'initBrowserSync', 'watch', 'update']);


