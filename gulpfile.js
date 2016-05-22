'use strict';var gulp = require('gulp');//引入gulpvar del = require('del');//引入删除文件var browserSync = require('browser-sync');//引入浏览器模块var reload = browserSync.reload;var $ = require('gulp-load-plugins')();var express = require('express');var router = express.Router();var _ = require('underscore');var fs = require('fs');var nodemon   = require('gulp-nodemon');var BROWSER_SYNC_RELOAD_DELAY = 500;var AUTOPREFIXER_BROWSERS = [    'ie >= 10',    'ie_mob >= 10',    'ff >= 30',    'chrome >= 34',    'safari >= 7',    'opera >= 23',    'ios >= 7',    'android >= 4.4',    'bb >= 10'];gulp.task('styles:sass', function () {    var sass = require('gulp-sass');    var concat = require('gulp-concat');    // gulp.src(['src/scss/build.scss','src/scss/_theme.scss'])    //   .pipe(concat('bootstrap.css'))    //   .pipe(sass())    //   .pipe(gulp.dest('src/styles'))    //   .pipe($.size({title: 'styles:sass:bootstrap.css'}));    gulp.src(['apps/scss/*.scss'])    // .pipe(concat('apps.css'))        .pipe(sass())        .pipe(gulp.dest('apps/styles'))        .pipe($.size({title:'apps/styles/'}));    gulp.src(['apps/scss/apps/*.scss'])        .pipe(concat('all.css'))        .pipe(sass())        .pipe(gulp.dest('apps/styles'))        .pipe($.size({title:'all.css'}));    gulp.src(['apps/scss/saas/*.scss'])        .pipe(concat('saas_all.css'))        .pipe(sass())        .pipe(gulp.dest('apps/styles'))        .pipe($.size({title:'saas_all'}));});gulp.task('styles', ['styles:sass']);gulp.task('concatRoutes',function(){    var concat = require('gulp-concat');    gulp.src(['server/api/a.js','server/api/login.js','server/api/router/*.js','server/api/b.js'])        .pipe(concat('api.js'))        .pipe(gulp.dest('server/api'))})var called = false;gulp.task('nodemon', function(cb) {    nodemon({        script: 'server.js',        watch:['server.js','server/api/api.js']    })        .on('start',function(){            if (!called) { cb(); }            called = true;        })        .on('restart', function() {            setTimeout(function reload() {                browserSync.reload({                    stream: false                });            }, BROWSER_SYNC_RELOAD_DELAY);        });});gulp.task('serve',['nodemon'],function(){    browserSync({        notify: false,        proxy: 'http://127.0.0.1:8080',        port:4000    });    // gulp.watch(['server/router/*.js'],['concatRoutes'],reload);    gulp.watch(['apps/scss/*.scss'],['styles:sass']);    gulp.watch(['apps/scss/apps/*.scss'],['styles:sass']);    gulp.watch(['apps/scss/saas/*.scss'],['styles:sass']);});gulp.task('default', ['serve']);