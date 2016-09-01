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
      livereload = require('gulp-livereload')
      babel = require('gulp-babel');

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
 //js脚本
 gulp.task('scripts',function(){
    return gulp.src('src/scripts/*.js')
               .pipe(jshint('.jshintrc'))
               .pipe(jshint.reporter('default'))
               .pipe(concat('main.js'))
               .pipe(gulp.dest('dist/scripts'))
               .pipe(rename({suffix : '.min'}))
               .pipe(uglify())
               .pipe(gulp.dest('dist/scripts'))
               .pipe(notify({message :　"scripts task complete"}));
 });
 //图片
 gulp.task('images',function(){
   return gulp.src('src/images/*')
              .pipe(cache(imagemin({optimizationLevel:3,progressive:true,interlaced : true})))
              .pipe(gulp.dest('dist/images'))
              .pipe(notify({message : "Images task complete"}));
 });
 //清理
 gulp.task('clean',function(){
   return gulp.src(['dist/scripts','dist/styles','dist/images'],{read:false})
               .pipe(clean());
 });
 //预设任务
 gulp.task('default',['clean'],function(){
     gulp.start('styles','scripts','images');
 });
 //看守
 gulp.task('watch',function(){
     //监测。less文档
     gulp.watch('src/styles/*.less',['styles']);
     //监测.js文档
     gulp.watch('src/scripts/*.js',['scripts']);
     //看守所有图片档
     gulp.watch('src/images/**',['images']);
     //看守所有文档
     var server = livereload();
     gulp.watch(['dist/**']).on('change',function(file){
        server.changed(file.path);
     });
 });
 //编译es6
 gulp.task('es6',function(){
   return gulp.src('src/scripts/main.js')
              .pipe(babel({
                presets : ['es2015']
              }))
              .pipe(gulp.dest('dist/scripts/'));
 });
