var gulp       = require('gulp');
var less       = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var consolidate = require('gulp-consolidate');
var iconfont = require('gulp-iconfont');

gulp.task('compile-less', function() {
    gulp.src('src/assets/less/site.less')
        .pipe(less())
        .pipe(gulp.dest('src/assets/css/'));
});

gulp.task('watch-less', function() {
    gulp.watch('src/assets/less/**/*.less' , ['compile-less']);
});

//Convert SVG to font icon
gulp.task('iconfont', function () {
  return gulp.src('src/assets/images/icons/*.svg')
    .pipe(iconfont({
      fontName: 'ic',
      formats: ['ttf', 'eot', 'woff', 'woff2'],
      appendCodepoints: true,
      appendUnicode: false,
      normalize: true,
      fontHeight: 1000,
      centerHorizontally: true
    }))
    .on('glyphs', function (glyphs, options) {
      gulp.src('src/assets/icon-font/*.less')
        .pipe(consolidate('underscore', {
          glyphs: glyphs,
          fontName: options.fontName,
          fontDate: new Date().getTime()
        }))
        .pipe(gulp.dest('src/assets/icon-font/dist/less'));

      gulp.src('src/assets/icon-font/index.html')
        .pipe(consolidate('underscore', {
          glyphs: glyphs,
          fontName: options.fontName
        }))
        .pipe(gulp.dest('src/assets/icon-font/dist/'));
    })
    .pipe(gulp.dest('src/assets/icon-font/dist/fonts'));
});

//Copy JS files from src/assets/vendor to
gulp.task('copyfiles', function() {
  gulp.src('src/assets/icon-font/dist/fonts/*.{ttf,woff,woff2,eot,svg}')
    .pipe(gulp.dest('src/assets/fonts/icon-font'));
});


gulp.task('autoprefixer', function () {
    return gulp.src('src/assets/css/site.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/assets/css'));
});

gulp.task('font', ['iconfont']);
gulp.task('less', ['compile-less', 'copyfiles']);
gulp.task('default', ['compile-less', 'copyfiles', 'watch-less']);

