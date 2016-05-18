'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var args   = require('yargs').argv;
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var order = require('gulp-order');
var del = require('del');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');

var release = args.release ? true : false;

gulp.task('clean', function() {
	return del.sync('build');
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

gulp.task('loaders-stylus', function() {
  return gulp.src('src/styles/Loaders/*.styl')
  .pipe(stylus())
  .pipe(concat('loaders.css'))
  .pipe(gulp.dest('build/styles'));
});

gulp.task('menus-stylus', function() {
  return gulp.src('src/styles/Menus/*.styl')
  .pipe(stylus())
  .pipe(concat('menus.css'))
  .pipe(gulp.dest('build/styles'));
});

gulp.task('accordions-stylus', function() {
  return gulp.src('src/styles/Accordions/*.styl')
  .pipe(stylus())
  .pipe(concat('accordions.css'))
  .pipe(gulp.dest('build/styles'));
});

gulp.task('ftue-stylus', function() {
  return gulp.src('src/styles/Ftue/*.styl')
  .pipe(stylus())
  .pipe(concat('ftue.css'))
  .pipe(gulp.dest('build/styles'));
});

gulp.task('release-stylus', function() {
  return gulp.start('loaders-stylus', 'menus-stylus', 'accordions-stylus', 'ftue-stylus');
});

gulp.task('libs', function() {
  return gulp.src('src/libs/**/*')
    .pipe(order([
      "jquery-2.2.3.min.js",
      "lodash-v411-1.js",
      "angular.min.js",
      "angular-route.min.js"
    ]))
    .pipe(concat('all_libs.js'))
    .pipe(gulp.dest('build/libs'));
});

gulp.task('loaders-js', function() {
  return gulp.src('src/js/Loaders/*.js')
    .pipe(jshint())
    .pipe(concat('loaders.js'))
    .pipe(gulpif(release, uglify())) // only minify if production (gulp --release)
    .pipe(gulp.dest('build/js/Loaders'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('menus-js', function() {
  return gulp.src('src/js/Menus/*.js')
    .pipe(jshint())
    .pipe(concat('menus.js'))
    .pipe(gulpif(release, uglify())) // only minify if production (gulp --release)
    .pipe(gulp.dest('build/js/Menus'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('accordions-js', function() {
  return gulp.src('src/js/Accordions/*.js')
    .pipe(jshint())
    .pipe(concat('accordions.js'))
    .pipe(gulpif(release, uglify())) // only minify if production (gulp --release)
    .pipe(gulp.dest('build/js/Accordions'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('ftue-js', function() {
  return gulp.src('src/js/FTUE/*.js')
    .pipe(jshint())
    .pipe(concat('ftue.js'))
    .pipe(gulpif(release, uglify())) // only minify if production (gulp --release)
    .pipe(gulp.dest('build/js/FTUE/'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('main-js', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(order([
        "route.js",
        "headerCtrl.js"
      ]))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('release-js', function() {
  return gulp.src('src/js/*.js')
  .pipe(concat('out.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
});

gulp.task('js', function() {
  return gulp.start('main-js', 'loaders-js', 'menus-js', 'accordions-js', 'ftue-js'); 
});

gulp.task('main-jade', function() {
  return gulp.src('src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('loaders-jade', function() {
  return gulp.src('src/templates/Loaders/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build/templates/Loaders'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('menus-jade', function() {
  return gulp.src('src/templates/Menus/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build/templates/Menus'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('accordions-jade', function() {
  return gulp.src('src/templates/Accordions/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build/templates/Accordions'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('ftue-jade', function() {
  return gulp.src('src/templates/Ftue/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build/templates/Ftue'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('jade', function() {
  return gulp.start('main-jade', 'loaders-jade', 'menus-jade', 'accordions-jade', 'ftue-jade'); 
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
  	.pipe(gulp.dest('build/fonts'));
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

gulp.task('watch', function () {
  gulp.watch('src/js/*.js', ['main-js']);
  gulp.watch('src/js/Loaders/*.js', ['loaders-js']);
  gulp.watch('src/js/Menus/*.js', ['menus-js']);
  gulp.watch('src/js/Accordions/*.js', ['accordions-js']);
  gulp.watch('src/js/FTUE/*.js', ['ftue-js']);
  if (release) {
    gulp.watch('src/**/*.js', ['release-js']);
  }
  
  gulp.watch('src/*.jade', ['main-jade']);
  gulp.watch('src/templates/Loaders/*.jade', ['loaders-jade']);
  gulp.watch('src/templates/Menus/*.jade', ['menus-jade']);
  gulp.watch('src/templates/Accordions/*.jade', ['accordions-jade']);
  gulp.watch('src/templates/Ftue/*.jade', ['ftue-jade']);

  gulp.watch('src/**/*.styl', ['stylus']);
  if (release) {
    gulp.watch('src/**/*.styl', ['release-stylus']);
  }
});

gulp.task('default', function() {
    runSequence('clean', ['fonts', 'icons'], 'libs', 'js', 'jade', 'stylus', 'initBrowserSync', 'watch');
    if (release) {
      runSequence(['release-js', 'release-stylus']);
    }
});


