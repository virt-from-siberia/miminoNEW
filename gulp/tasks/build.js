module.exports = function () {
  $.gulp.task('build', $.gulp.series('clean', 'copy', 'sass', 'less', 'scripts','scriptsExternal', 'php', 'images', 'webp', 'svg'));
};