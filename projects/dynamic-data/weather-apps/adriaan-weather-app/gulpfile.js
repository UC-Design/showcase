var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var watch = require('gulp-watch');
var sass = require('gulp-sass');

// gulp.task("default", function () {
//     return watch('src/**/*.ts', {verbose: true}, function() {
//         return tsProject.src()
//         .pipe(tsProject())
//         .js.pipe(gulp.dest("public/js"));
//     })
// });

gulp.task("ts", function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("public/js"));
})

gulp.task("sass", function() {
    return gulp.src('./src/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
})

gulp.task('default', function() {
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.ts', ['ts'])
})