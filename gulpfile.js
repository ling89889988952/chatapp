var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

gulp.task("sass", function() {
  return gulp
    .src("sass/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("./public/css"))
});

gulp.task("watch", function() {
  gulp.watch("sass/**/*.scss", gulp.series("sass"));
});

gulp.task('browser-sync', function() {  
  browserSync.init(["public/css/*.css", "public/js/*.js"], {
      server: {
          baseDir: "./"
      }
  });
});