const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
const gulpCopy = require('gulp-copy');

 
gulp.task('fileinclude', function(cb) {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist'));

  cb();
});

gulp.task('filecopy', function(cb) {
  const sourceFiles = ['css/*', 'images/*'];
  const outputPath = 'dist/';
  gulp.src(sourceFiles)
    .pipe(gulpCopy(outputPath))

  cb();
});