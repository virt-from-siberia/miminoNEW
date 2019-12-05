module.exports = function () {
  $.gulp.task('copy', function () {
    return $.gulp.src([
        'fonts/**/*',
        'img/**',
        '*.html',
        // 'external_library/**',
        // 'core/**',
        'video/**'
      ], {
        base: '.'
      })
      .pipe($.gulp.dest('build'));
  });
};