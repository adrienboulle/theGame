var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var series = require('stream-series');
var gulpUtil = require('gulp-util');
var es = require('event-stream');
var merge = require('merge-stream');
var angularFilesort = require('gulp-angular-filesort');

var conf = {
	prod: !!gulpUtil.env.prod
}

gulp.task('clean', function () {
	return gulp.src('./public', {read: false})
		.pipe(clean());
});

gulp.task('import', function () {
	gulp.src('./sources/index.html')
		.pipe(gulp.dest('./public/'));
  	
	var htmlStream = gulp.src(['./sources/js/app/**/*.html'])
  		.pipe(gulp.dest('./public/js/app/'));

  	var cssStream = gulp.src(['./sources/**/*.css'])
  		.pipe(conf.prod ? concat('style.css') : gulpUtil.noop())
  		.pipe(gulp.dest('./public/css/'));
		
	var jsAppStream = gulp.src(['./sources/js/app/**/*.js'])
		.pipe(angularFilesort())
		.pipe(conf.prod ? concat('app.js') : gulpUtil.noop())
  		.pipe(conf.prod ? uglify().on('error', gulpUtil.log) : gulpUtil.noop())
		.pipe(gulp.dest('./public/js/app/'));
				
	return merge(jsAppStream, cssStream, htmlStream);
		
});

gulp.task('inject', function () {
	var target = gulp.src('./public/index.html');

  	var cssStream = gulp.src(['./public/**/*.css']);

	var pathJsAngular = (conf.prod) ? ['./sources/js/imports/angular.min.js'] : ['./sources/js/imports/angular.js'];
	var pathJsDep = (conf.prod) ? ['./sources/js/imports/**/*.min.js', '!./sources/js/imports/angular.min.js'] : ['./sources/js/imports/**/*.js', '!./sources/js/imports/**/*.min.js', '!./sources/js/imports/angular.js'];

	var jsAng = gulp.src(pathJsAngular)
	  	.pipe(gulp.dest('./public/js/imports'));
	
	var jsDepStream = gulp.src(pathJsDep)
		.pipe(conf.prod ? concat('imports.js') : gulpUtil.noop())
	  	.pipe(gulp.dest('./public/js/imports'));
	
	var jsAppStream = gulp.src(['./public/js/app/**/*.js']);
		
	return target
		.pipe(inject(cssStream, {relative: true}))
		.pipe(inject(series(jsAng, jsDepStream, jsAppStream), {relative: true}))
    	.pipe(gulp.dest('./public/'));
});

gulp.task('build', function(callback) {
	runSequence('clean',
              'import',
			  'inject',
              callback);
	
	gulp.watch('sources/**/*', ['build']);
});

gulp.task('default', ['build']);