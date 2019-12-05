global.$ = {
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    browserSync: require('browser-sync').create(),
    del: require('del'),
    imageminJpegRecompress: require('imagemin-jpeg-recompress'),
    pngquant: require('imagemin-pngquant'),
    path: {
        config: require('./gulp/config'),
        jquery: './js/jquery.js',
        js: './js/**/*.js',
        jsExternal: './external_library/**/*.js',
        php: './core/**/*.php'
    }
};

$.path.config.forEach(function (path) {
    require(path)();
});



$.gulp.task('default', $.gulp.series('clean', 'copy', 'sass', 'less', 'scripts', 'scriptsExternal', 'php', 'images', 'webp', 'svg', 'serve'));