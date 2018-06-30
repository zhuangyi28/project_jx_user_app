/**
 * Created by Administrator on 2018/6/22.
 */
const gulp = require('gulp'),

    ejs = require('gulp-ejs'),//模板引擎

    less = require('gulp-less'),//less解码

    autoprefixer = require('gulp-autoprefixer'),//css兼容性

    rename = require('gulp-rename'),//重命名

    babel = require("gulp-babel"),//es6 -> es5

    imagemin = require('gulp-imagemin'),//图片压缩

    pngquant = require('imagemin-pngquant'),//png压缩

    cache = require('gulp-cache'),//缓存

    connect = require('gulp-connect'),//服务器

    uglify = require('gulp-uglify'),//压缩js

    cheerio = require('gulp-cheerio'),//批量更换html中的引用

    runSequence = require('run-sequence'),//顺序执行

    concatDir = require('gulp-concat-dir'),//按文件夹合并

    concat = require('gulp-concat'),//合并文件

    clean = require('gulp-clean'),//清除文件

    through = require('through2');//通道


var file_name,//文件夹名称

    file_name_fa,//父文件夹名称

    file_list = [],//地址列表

    file_list_fa = [];//父页面地址列表


//ejs文件合并成html
gulp.task("build_ejs", ()=> {

    console.log('合并ejs文件')

    return gulp.src('src/view/**/*.ejs')

        .pipe(ejs())

        .pipe(through.obj(function (file, enc, cb) {

            file_name = file.relative.split("\\")[1];

            this.push(file);

            cb();

            file_list.push(file_name)

            console.log('file_name:' + file_name)

        }))

        .pipe(through.obj(function (file, enc, cb)  {

            file_name_fa = file.relative.split("\\")[0];

            this.push(file);

            cb();

            file_list_fa.push(file_name_fa);

            console.log('file_name_fa:' + file_name_fa)

        }))

        //增加媒体查询，通用样式文件
        .pipe(cheerio({

            run($) {

                var addHtml = "";

                addHtml += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n'

                addHtml += "<meta name='viewport' content='width=device-width,initial-scale=1,user-scalable=0,minimum-scale=1, maximum-scale=1'>\n";

                addHtml += "<meta name='apple-mobile-web-app-capable' content='yes' />\n";

                addHtml += "<meta name='apple-mobile-web-app-status-bar-style' content='black' />\n";

                addHtml += "<meta name='format-detection' content='telephone=no, email=no' />\n";

                addHtml += "<link rel='stylesheet'  href='../../../css/libs.css'/>\n";//第二版开发样式

                addHtml += "<link rel='stylesheet'  href='../../../css/common.css'/>\n";//第二版开发样式

                addHtml += "<link rel='stylesheet'  href='../../../css/" + file_name + ".css'/>\n";

                $('head').append(addHtml);

                //console.log(file_name)

            },

            parserOptions: {
                // Options here
                decodeEntities: false
            }

        }))


        //增加脚本
        .pipe(cheerio({

            run($) {

                let addHtml = "";

                addHtml += '\n<script src="../../../js/libs.js"></script>'

                addHtml += '\n<script src="../../../js/common.js"></script>'

                addHtml += '\n<script src="../../../js/' + file_name + '.js"></script>\n'

                $('body').append(addHtml);

            },

            parserOptions: {
                // Options here
                decodeEntities: false
            }

        }))

        .pipe(rename({

            extname: ".html"

        }))

        .pipe(gulp.dest('.build/html'))//输出为html

        .pipe(connect.reload());


});

//合并js文件
gulp.task('build_js', ()=> {

    for (let i = 0; i < file_list_fa.length; i++) {

        gulp.src('src/view/' + file_list_fa[i] + '/**/*.js')

            .pipe(babel())

            .pipe(concatDir({ext: '.js'}))

            .pipe(gulp.dest('.build/js'))

            .pipe(connect.reload());

    }

    console.log(' 合并业务js文件' + file_list_fa)

});


//通用js
gulp.task('build_js_common', ()=> {

    gulp.src('src/basic/**/*.js')

        .pipe(babel())

        .pipe(concat('common.js'))

        .pipe(gulp.dest('.build/js'))

        .pipe(connect.reload());

    console.log(' 合并通用js文件')

})

//js框架
gulp.task('build_js_libs', ()=> {

    gulp.src('src/libs/**/*.js')

        .pipe(uglify())

        .pipe(concat('libs.js'))

        .pipe(gulp.dest('.build/js'))

})

//合并css文件
gulp.task('build_css', ()=> {

    for (let i = 0; i < file_list_fa.length; i++) {

        gulp.src('src/view/' + file_list_fa[i] + '/**/*.{less,css}')

            .pipe(less()) //编译less

            .pipe(autoprefixer({

                browsers: ['Android >= 4.0', 'IOS >=7'],//兼容设备

                cascade: true, //是否美化属性值 默认：true 像这样：

                remove: true //是否去掉不必要的前缀 默认：true

            }))

            .pipe(concatDir({ext: '.css'}))

            .pipe(gulp.dest('.build/css'))

            .pipe(connect.reload());

    }

    console.log(' 合并业务css文件' + file_list_fa)


});

gulp.task('build_css_common', ()=> {

    gulp.src('src/basic/**/*.{less,css}')

        .pipe(less()) //编译less

        .pipe(autoprefixer({

            browsers: ['Android >= 4.0', 'IOS >=7'],//兼容设备

            cascade: true, //是否美化属性值 默认：true 像这样：

            remove: true //是否去掉不必要的前缀 默认：true

        }))

        .pipe(concat('common.css'))

        .pipe(gulp.dest('.build/css'))

        .pipe(connect.reload());

    console.log(' 合并通用css文件')

})

gulp.task('build_css_libs', ()=> {

    gulp.src('src/libs/**/*.{less,css}')

        .pipe(less()) //编译less

        .pipe(concat('libs.css'))

        .pipe(gulp.dest('.build/css'))

});

gulp.task('build_server', () => {

    connect.server({

        name: 'jx_user',//服务名称

        root: '.build',//目录

        //host:'172.18.0.42',

        port: 222,//端口

        livereload: true//是否支持实时刷新

    });

})

//转换图片
gulp.task('build_img', ()=> {

    gulp.src('src/img/**/*.{png,jpg,gif}')

        .pipe(cache(imagemin({

            progressive: true,

            use: [pngquant()]

        })))

        .pipe(gulp.dest('.build/img'));


    gulp.src('src/icon/**/*.{png,jpg,gif}')

        .pipe(cache(imagemin({

            progressive: true,

            use: [pngquant()]

        })))

        .pipe(gulp.dest('.build/icon'));


})


gulp.task('build_font', ()=> {

    gulp.src('src/fonts/**/*')

        .pipe(gulp.dest('.build/fonts'));


})

//清除文件
gulp.task('build_clean', ()=> {

    return gulp.src(["./.build/css", "./.build/html", "./.build/icon", "./.build/img", "./.build/js", "./.build/fonts", "!./.build/manifest.json"])

        .pipe(clean());

})


//监听文件变化
gulp.task('build_watch', () => {

    //less文件修改 ，注入css
    gulp.watch('src/view/**/*.ejs', ['build_ejs']);

    //html,js文件修改，重新拼接，刷新
    gulp.watch('src/view/**/*.{css,less}', ["build_css"]);

    gulp.watch('src/basic/**/*.{css,less}', ["build_css_common"]);

    //html,js文件修改，重新拼接，刷新
    gulp.watch('src/view/**/*.js', ['build_js']);

    gulp.watch('src/basic/**/*.js', ['build_js_common']);


});


var build = (done)=> {

    runSequence(
        ['build_clean'],

        ['build_ejs'],

        ['build_js_libs'],

        ['build_js_common'],

        ['build_js'],

        ['build_css_libs'],

        ['build_css_common'],

        ['build_css'],

        ['build_font'],

        ['build_img'],

        ['build_watch'],

        ['build_server'],

        done);


}


module.exports = build;