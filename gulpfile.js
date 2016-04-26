'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var del = require('del');

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

gulp.task('move-index', function() {
	return gulp.src('src/index.html')
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

gulp.task('initBrowserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  })
});

gulp.task('watch', ['initBrowserSync', 'jade', 'stylus', 'move-index'], function () {
  gulp.watch('src/**/*.jade', ['jade']);
  gulp.watch('src/**/*.styl', ['stylus']);
  gulp.watch('src/index.html', ['move-index']);
  gulp.watch('src/**/*.html', browserSync.reload);
  gulp.watch('src/**/*.css', browserSync.reload);
  gulp.watch('src/**/*.js', browserSync.reload);
});

gulp.task('update', ['move-index', 'jade', 'stylus']);
gulp.task('default', ['clean', 'fonts', 'libs', 'initBrowserSync', 'watch', 'update']);


