var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var series = require('stream-series');
var gulpUtil = require('gulp-util');
var es = require('event-stream');
var merge = require('merge-stream');
var angularFilesort = require('gulp-angular-filesort');
var rename = require('gulp-rename');
var mainBowerFiles = require('main-bower-files');

var conf = {
	prod: !!gulpUtil.env.production
}


// supprime tout ce qui se trouve dans le dossier public
gulp.task('clean', function () {
	return gulp.src('./public', {read: false})
		.pipe(clean());
});

// gère les imports de bower 
gulp.task("bower-files", function() {
    return gulp.src(mainBowerFiles())
    	.pipe(gulp.dest("./public/imports"));
});

// gère les imports de l'app
gulp.task('import', function () {
	
	gulp.src('./sources/index.html')
		.pipe(gulp.dest('./public/'));

	var htmlStream = gulp.src(['./sources/js/app/**/*.html'])
 		.pipe(gulp.dest('./public/js/app/'));

 	var cssStream = gulp.src(['./sources/css/**/*.css'])
 		.pipe(conf.prod ? concat('style.css') : gulpUtil.noop())
 		.pipe(conf.prod ? uglifycss() : gulpUtil.noop())
 		.pipe(gulp.dest('./public/css/'));
		
	var jsStream = gulp.src(['./sources/js/**/*.js'])
		.pipe(angularFilesort())
		.pipe(conf.prod ? concat('app.js') : gulpUtil.noop())
 		.pipe(conf.prod ? uglify().on('error', gulpUtil.log) : gulpUtil.noop())
		.pipe(gulp.dest('./public/js/'));
				
	return merge(jsStream, cssStream, htmlStream);
		
});

gulp.task('inject', function () {
	var target = gulp.src('./public/index.html');

  	var cssStream = gulp.src(['./public/**/*.css']);

	var pathJsJQ = ['./public/imports/**/jquery*.js'];
	var pathJsAngular = ['./public/imports/**/angular.js'];
	var pathJsDep = ['./public/imports/**/*.js', '!./public/imports/**/angular.js', '!./public/imports/**/jquery*.js'];

	var jsJq = gulp.src(pathJsJQ);

	var jsAng = gulp.src(pathJsAngular);
	
	var jsDepStream = gulp.src(pathJsDep)
		.pipe(conf.prod ? concat('imports.js') : gulpUtil.noop());

	var jsAppStream = gulp.src(['./public/js/app/**/*.js']);
		
	return target
		.pipe(inject(cssStream, {relative: true}))
		.pipe(inject(series(jsJq, jsAng, jsDepStream, jsAppStream), {relative: true}))
    	.pipe(gulp.dest('./public/'));
});

gulp.task('build', function(callback) {
	runSequence(
		'clean',
		'bower-files',
        'import',
		'inject',
        callback);
	
	gulp.watch('sources/**/*', ['build']);
});

gulp.task('default', ['build']);var gulp = require('gulp');