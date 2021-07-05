const { src, dest, series, watch} = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin') 
const autoprefixes = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image') 
const babel = require('gulp-babel') 
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require ('browser-sync').create() 

const clean = () => {
    return del(['build'])
}

const resources = () => {
    return src('dev/resources/**')
    .pipe(dest('build'))
}

const styles = () => {
    return src('dev/styles/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(autoprefixes({
        cascade: false
    }))
    .pipe(cleanCss({
        level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('dev/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace: true,
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('dev/images/svg/**/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest('build/images'))
}

const images = () => {
    return src([
        'dev/images/**/*.jpg',
        'dev/images/**/*.png',
        'dev/images/*.svg',
        'dev/images/**/*.jpeg',
    ])
    .pipe(image())
    .pipe(dest('build/images'))
}

const scripts = () => {
    return src([
        'dev/js/componets/**/*.js',
        'dev/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify().on('error',notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'build'
        }
    })
}
watch('dev/**/*.html', htmlMinify)
watch('dev/styles/**/*.css', styles) 
watch ('dev/images/svg/**/*.svg', svgSprites)
watch ('dev/js/**/*.js', scripts)
watch ('dev/resources/**', resources)

exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles)