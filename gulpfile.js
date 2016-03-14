var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gulpUtil = require('gulp-util');
var es = require('event-stream');
var angularFilesort = require('gulp-angular-filesort');

var conf = {
	prod: !!gulpUtil.env.prod
}

gulp.task('clean', function () {
	return gulp.src('./public', {read: false})
		.pipe(clean());
});

gulp.task('dev', function () {
	var target = gulp.src('./sources/index.html')
		.pipe(gulp.dest('./public/'));
  	
	var htmlStream = gulp.src(['./sources/js/app/**/*.html'])
  		.pipe(gulp.dest('./public/js/app/'));

  	var cssStream = gulp.src(['./sources/**/*.css'])
  		.pipe(conf.prod ? concat('style.css') : gulpUtil.noop())
  		.pipe(gulp.dest('./public/'));

	return jsStream = gulp.src(['./sources/**/*.js'])
		.pipe(angularFilesort())
		.pipe(conf.prod ? concat('app.js') : gulpUtil.noop())
  		.pipe(conf.prod ? uglify().on('error', gulpUtil.log) : gulpUtil.noop())
	  	.pipe(gulp.dest('./public/'));
});

gulp.task('inject', function () {
	var target = gulp.src('./public/index.html');

  	var cssStream = gulp.src(['./public/**/*.css']);

	var jsStream = gulp.src(['./public/**/*.js']);

	return target
		.pipe(inject(es.merge(cssStream, jsStream), {relative: true}))
    	.pipe(gulp.dest('./public/'));
});


gulp.task('build', function(callback) {
  runSequence('clean',
              'dev',
			  'inject',
              callback);
});