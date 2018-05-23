const gulp = require('gulp');
const webpack = require('webpack-stream');
const concat = require('gulp-concat');
const watch = require('gulp-watch');

gulp.task('build', function () {
    return gulp
        .src('./src/index.js')
        .pipe(webpack({
            module: {
                loaders: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015']
                        }
                    }
                ]
            }
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function (cb) {
    watch('src/**/*.js', function () {
        gulp.start('build');
    });
});