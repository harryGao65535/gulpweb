/*
* 2016.8.31
* gulp-main
* */
  //在根目录引入gulp 和 gulp插件
  var gulp = require('gulp'),
      less = require('gulp-less'),
      autoprefixer = require('gulp-autoprefixer'),
      minifycss = require('gulp-minify-css'),
      jshint = require('gulp-jshint'),
      uglify = require('gulp-uglify'),
      imagemin = require('gulp-imagemin'),
      rename = require('gulp-rename'),
      clean = require('gulp-clean'),
      concat = require('gulp-concat'),
      notify = require('gulp-notify'),
      cache  = require('gulp-cache'),
      livereload = require('gulp-livereload');

  //样式的控制
  gulp.task('styles',function(){
    return gulp.src('src/styles/main.less')
           .pipe(less())
           .pipe(autoprefixer('last 2 version','safari 5','ie 8','ie 9','opera 12.1','ios 6','android 4'))
           .pipe(gulp.dest('dist/styles'))
           .pipe(rename({suffix : '.min'}))
           .pipe(minifycss())
           .pipe(gulp.dest('dist/styles'))
           .pipe(notify({message : 'styles task complete'}));
  });
