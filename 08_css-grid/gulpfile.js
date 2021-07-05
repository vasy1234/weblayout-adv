const {
  src,
  dest,
  parallel,
  series,
  watch
} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del')
const fileinclude = require('gulp-file-include');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const browserSync = require('browser-sync').create();


const clean = () => {
  return del(['build'])
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('build'))
}

const fonts = () => {
  src('src/fonts/**/*.ttf')
    .pipe(ttf2woff())
    .pipe(dest('build/fonts'))
  return src('src/fonts/**/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('build/fonts'))
}

const styles = () => {
  return src('src/styles/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(concat('main.min.css'))
    .pipe(autoprefixes({
      cascade: false
    }))
    .pipe(cleanCss({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('build/css'))
    .pipe(browserSync.stream())
}

const htmlInclude = () => {
  return src(['src/index.html'])
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('build/img'))
}

const images = () => {
  return src([
      'src/img/**/*.jpg',
      'src/img/**/*.png',
      'src/img/*.svg',
      'src/img/**/*.jpeg',
    ])
    .pipe(image())
    .pipe(dest('build/img'))
}

const scripts = () => {
  return src([
      'src/js/componets/**/*.js',
      'src/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(dest('build/scripts'))
    .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  })
}
watch('src/index.html', htmlInclude)
watch('src/**/*.html', htmlMinify)
watch('src/styles/scss/**/*.scss', styles)
watch('src/img/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)
watch('src/fonts/**.ttf', fonts)

exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, resources, fonts, htmlInclude, htmlMinify, scripts, styles, images, svgSprites, watchFiles)
