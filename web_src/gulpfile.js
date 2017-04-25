'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');

var del = require('del');
var merge2 = require('merge2');
var multiDest = require('gulp-multi-dest')

var webpackConfig = require('./webpack.config.js');

// bundle clean
gulp.task('clean', function() {
    return del( '../src/main/webapp/views/*.*', {force: true});
});

// bundle build
gulp.task('build', ['clean'], function() {
	var rename = require('gulp-rename');
	return merge2(
		gulp.src('./src/index.js')
			.pipe(webpack(webpackConfig))
			.pipe(uglify())
			.pipe(rename({extname: '.min.js'}))
			.pipe(gulp.dest('../src/main/webapp/js/')),
		gulp.src('./src/index.html')
			.pipe(gulp.dest('../src/main/webapp/views/'))
	);
});

gulp.task('default', ['build']);