var gulp = require('gulp')
var sass = require('gulp-sass')
var sassGlob = require('gulp-sass-glob')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')
var touch = require('gulp-touch-cmd')

var processors = [
  autoprefixer({ grid: 'autoplace' }),
  cssnano({ zindex: false }),
]

function styles() {
  return gulp
    .src('src/assets/scss/**/*.scss', { sourcemaps: true })
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('src/assets/css', { sourcemaps: '.' }))
    .pipe(touch())
}

function watch() {
  gulp.watch('src/assets/scss/**/*.scss', styles)
}

exports.styles = styles
exports.watch = watch
exports.default = gulp.series(styles, watch)
