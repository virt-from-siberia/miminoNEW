module.exports = function () {
    $.gulp.task('serve', function () {
        $.browserSync.init({
            server: 'build/'
            // tunnel: true
        });

        $.gulp.watch('sass/**/*.scss', $.gulp.series('sass'));
        $.gulp.watch('less/**/*.less', $.gulp.series('less'));
        $.gulp.watch('*.html', $.gulp.series('html'));
        $.gulp.watch('js/**/*.js', $.gulp.series('scripts'));
        $.gulp.watch('external_library/**/*.js', $.gulp.series('scriptsExternal'));
        $.gulp.watch('core/**/*.php', $.gulp.series('php'));
        $.gulp.watch('img/**/*.{png, jpg, svg}', $.gulp.series('allimg'));
    });
};