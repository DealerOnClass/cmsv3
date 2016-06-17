var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var csscomb      = require('gulp-csscomb');
var cssnano      = require('gulp-cssnano');
var jade         = require('gulp-jade');
var plumber      = require('gulp-plumber');
var sass         = require('gulp-sass');

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

gulp.task(html);
gulp.task(serve);
gulp.task(styles);
gulp.task(watch);
gulp.task('default',
    gulp.series(
        html,
        styles,
        gulp.parallel(watch, serve)
    )
);

function html() {
    return gulp.src(paths.html.src)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(paths.html.dist))
        .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: './dist',
        notify: true
    });
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(cssnano({
            core: false,
            discardComments: { removeAll: true }
        }))
        .pipe(csscomb())
		.on('error', function() {
			this.emit('end');
		})
        .pipe(gulp.dest(paths.styles.dist))
        .pipe(browserSync.stream());
}

function watch() {
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.styles.src, styles);
}
