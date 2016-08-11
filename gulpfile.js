var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
	return gulp.src('public/app/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('public/app/css'));
});

gulp.task('default', ['sass']);