'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'BG',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});
gulp.task('views',['components'],function(){
  gulp.src([
    path.join(conf.paths.src, '/app/views/**/*.html')
  ])
  .pipe($.minifyHtml({
    empty: true,
    spare: true,
    quotes: true,
    conditionals: true
  }))
  .pipe(gulp.dest(path.join(conf.paths.dist, 'app/views')))
});

gulp.task('components',function(){
  gulp.src([
    path.join(conf.paths.src, '/app/components/**/*.html')
  ])
  .pipe($.minifyHtml({
    empty: true,
    spare: true,
    quotes: true,
    conditionals: true
  }))
  .pipe(gulp.dest(path.join(conf.paths.dist, 'app/components')))
});

gulp.task('html', ['inject','views'], function () {
//  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
//  var partialsInjectOptions = {
//    starttag: '<!-- inject:partials -->',
//    ignorePath: path.join(conf.paths.tmp, '/app/views'),
//    addRootSlash: false
//  };

  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    //.pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({ mangle:false, preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('../../bower_components/bootstrap-sass-official/assets/fonts/bootstrap/', '../fonts/'))
    .pipe($.replace('style/fonts', '../fonts/'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  var src=[path.join(conf.paths.src, '../bower_components/bootstrap-sass-official/**/*')];
  src.push(path.join(conf.paths.src,'app/**/*'));
  return gulp.src(src)
    .pipe($.filter('**/*.{otf,eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function (done) {
  $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], done);
});

gulp.task('build', ['fonts','html','other']);
