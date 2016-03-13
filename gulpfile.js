var gulp = require('gulp');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gulpUtil = require('gulp-util');
var es = require('event-stream');
var angularFilesort = require('gulp-angular-filesort');

gulp.task('index', function () {
	var target = gulp.src('./public/index.html');
  	
	var htmlStream = gulp.src(['./sources/js/app/**/*.html'])
  		.pipe(gulp.dest('./public/js/app/'));

  	var cssStream = gulp.src(['./sources/**/*.css'])
  		.pipe(concat('style.css'))
  		.pipe(gulp.dest('./public/'));

	var jsStream = gulp.src(['./sources/**/*.js'])
		.pipe(angularFilesort())
		.pipe(concat('app.js'))
  		.pipe(uglify().on('error', gulpUtil.log)) 
	  	.pipe(gulp.dest('./public/'));

	return target
		.pipe(inject(es.merge(cssStream, jsStream, htmlStream), {relative: true}))
    	.pipe(gulp.dest('./public'));
});