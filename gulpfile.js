/**
 * Created by Administrator on 2018/6/22.
 */
var gulp = require('gulp');

//发布生产
var dist = require('./gulp/dist.js');

gulp.task('.dist', dist);

//开发环境
var build = require('./gulp/build.js');

gulp.task('.build', build);

//测试环境
var test = require('./gulp/test.js');

gulp.task('.test', test);