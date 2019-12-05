const jsFiles = [
    $.path.jsExternal
];

module.exports = function () {
    $.gulp.task('scriptsExternal', function () {
        return $.gulp.src(jsFiles)
            .pipe($.gulp.dest('build/external_library'))
            .pipe($.browserSync.stream());
    });
};