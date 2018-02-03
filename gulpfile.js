"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');      // for a local dev server
var open = require('gulp-open');            // open a URL in the browser
var browserify = require('browserify');     // bundles JS
var reactify = require('reactify');         // converts React JSX into JavaScript
var source = require('vinyl-source-stream');// Turn text into streams for gulp processing
var concat = require('gulp-concat');        // concats files
var eslint = require('gulp-eslint');        // style check for JS files

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  eslint: {
    configJson: 'eslint.config.json'
  },
  sourceset: {
    html: './src/*.html',
    js: './src/**/*.js',
    css: ['node_modules/bootstrap/dist/css/bootstrap.min.css',
          'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
         ],
    images: './src/images/*',
    mainJs: './src/main.js'
  },
  dist: {
    root: './dist',
    indexHtml: './dist/index.html',
    images: './dist/images',
    scripts: './dist/scripts',
    css: './dist/css'
  }
}

gulp.task('lint-js', function() {
  gulp.src(config.sourceset.js)
    .pipe(eslint({config: config.eslint.configJson }))
    .pipe(eslint.format());
});

gulp.task('bundle-js', function() {
   browserify(config.sourceset.mainJs)
     .transform(reactify)
     .bundle()
     .on('error', console.error.bind(console))
     .pipe(source('bundle.js'))
     .pipe(gulp.dest(config.dist.scripts))
     .pipe(connect.reload());
});

gulp.task('bundle-css', function() {
  gulp.src(config.sourceset.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.dist.css));
});

gulp.task('copy-html', function() {
  gulp.src(config.sourceset.html)
    .pipe(gulp.dest(config.dist.root))
    .pipe(connect.reload());
});

gulp.task('copy-images', function() {
  gulp.src(config.sourceset.images)
    .pipe(gulp.dest(config.dist.images))
    .pipe(connect.reload());
});

gulp.task('assemble', ['lint-js', 'bundle-js', 'bundle-css', 'copy-images', 'copy-html']);

gulp.task('launch-connect-server', function() {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

gulp.task('launch', ['launch-connect-server'], function() {
  gulp.src(config.dist.indexHtml)
    .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('watch', function() {
  gulp.watch(config.sourceset.html, ['assemble']);
  gulp.watch(config.sourceset.js, ['assemble']);
  gulp.watch(config.sourceset.css, ['assemble']);
});

gulp.task('default', ['assemble', 'launch', 'watch']);
