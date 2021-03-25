const gulp = require('gulp');
const {
    watch
} = require('gulp');
const webp = require('gulp-webp');
const svgSprite = require('gulp-svg-sprite');

function defaultTask(cb) {
    // place code for your default task here
    cb();
}

const imagesWebp = () => {
    return gulp.src('images/*.{jpg,jpeg,png}')
        .pipe(webp({
            'quality': 100,
            'alphaQuality': 100,
            'method': 6,
            // 'lossless': true
        }))
        .pipe(gulp.dest('output/'));
}





const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

gulp.task('images', function() {
    return gulp.src('./images')
        .pipe(imageMin([
            pngquant(),
            mozjpeg({
                 progressive: true
            })
        ],{
            verbose: true
        }))
        .pipe(gulp.dest('./progressive'))
        .pipe(connect.reload())
});

exports.imageswebp = imagesWebp;


function svgsprite(cb) {
    return gulp.src('svg/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "sprite.svg" //sprite file name
                }
            },
        }))
        .pipe(gulp.dest('output-svg/'));
    cb();
}

exports.default = function () {
    // You can use a single task
    watch('images/*.{jpg,jpeg,png}', imagesWebp);
    watch('svg/*.svg', svgsprite);
};