const phpFiles = [
    $.path.php
];

module.exports = function () {
    $.gulp.task('php', function () {
        return $.gulp.src(phpFiles)
            .pipe($.gulp.dest('build/core'))
            .pipe($.browserSync.stream());
    });
};