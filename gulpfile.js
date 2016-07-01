var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browsersync  = require('browser-sync');
var csscomb      = require('gulp-csscomb');
var cssnano      = require('gulp-cssnano');
var jade         = require('gulp-jade');
var plumber      = require('gulp-plumber');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

var paths = {
    font: {
        src: './app/font/*.*',
        dist: './dist/font/',
    },
    html: {
        src: './app/*.jade',
        dist: './dist/',
    },
    img: {
        src: './app/img/**/*.*',
        dist: './dist/img/',
    },
    scripts: {
        src: './app/js/**/*.js',
        dist: './dist/js/',
    },
    styles: {
        src: './app/sass/**/*.scss',
        dist: './dist/css/',
    }
}

gulp.task(font);
gulp.task(html);
gulp.task(img);
gulp.task(scripts);
gulp.task(serve);
gulp.task(styles);
gulp.task(watch);
gulp.task('default',
    gulp.series(
        font,
        html,
        img,
        scripts,
        styles,
        gulp.parallel(watch, serve)
    )
);

function font() {
	return gulp.src(paths.font.src)
		.pipe(gulp.dest(paths.font.dist))
        .pipe(browsersync.stream());
}

function html() {
    return gulp.src(paths.html.src)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(paths.html.dist))
        .pipe(browsersync.stream());
}

function img() {
	return gulp.src(paths.img.src)
        .pipe(plumber())
        .pipe(gulp.dest(paths.img.dist))
        .pipe(browsersync.stream());
}

function scripts() {
	return gulp.src(paths.scripts.src)
		.pipe(gulp.dest(paths.scripts.dist))
        .pipe(browsersync.stream());
}

function serve() {
    browsersync.init({
        server: './dist',
        notify: true
    });
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(plumber())
		.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(cssnano({
            core: true,
            discardComments: { removeAll: true },
			discardUnused: false
        }))
        //	.pipe(csscomb())
		.pipe(sourcemaps.write('map'))
        .pipe(gulp.dest(paths.styles.dist))
        .pipe(browsersync.stream());
}

function watch() {
    gulp.watch(paths.font.src, font);
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.img.src, img);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
}
