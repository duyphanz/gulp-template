//ref: https://medium.com/@networkaaron/dev-diary-browsersync-gulp-file-include-4614903799a5

const fileinclude = require("gulp-file-include");
const gulp = require("gulp");
const beautify = require('gulp-jsbeautifier');
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

// tiny static page generator
gulp.task("fileinclude", function() {
  return gulp
    .src(["*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
});

// process JS files and return to the stream
// gulp.task("js", function() {
//   return gulp
//     .src("scripts/*js")
//     .pipe(gulp.dest("build/scripts"))
//     .pipe(browserSync.stream());
// });

// process CSS files and return to the stream
gulp.task("css", function() {
  return gulp
    .src("css/*css")
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
});

// process images and return to the stream
gulp.task("img", function() {
  return gulp
    .src("images/*")
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
});

gulp.task('beautify', () =>
  gulp.src(['css/*.css', '*.html'])
    .pipe(beautify())
    .pipe(gulp.dest('./dist'))
);

// ensures these tasks are completed before reloading browsers
// gulp.task("js-watch", ["js"], reload);
gulp.task("include-watch", gulp.series("fileinclude"), reload);
// gulp.task("default", ["fileinclude", "js", "css"], function() {
gulp.task("default", gulp.series("fileinclude", "css", "img"), function() {
  // serve files from the build folder
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
  // watch files and run tasks
  gulp.watch("*.html", gulp.series("include-watch"));
  // gulp.watch("scripts/*.js", ["js-watch"]);
  gulp.watch("css/*.css", gulp.series("css"));
});
