const gulp = require('gulp');
const replace = require('gulp-replace');
const merge = require('merge-stream');
const _ = require('lodash');
const svgSprite = require('gulp-svg-sprite');

const ICON_CATEGORIES = [
    'action',
    'alert',
    'av',
    'communication',
    'content',
    'device',
    'editor',
    'file',
    'hardware',
    'image',
    'maps',
    'navigation',
    'notification',
    'places',
    'social',
    'toggle',
];

gulp.task('svg-sprites', () =>
    _(ICON_CATEGORIES)
        .map((category) =>
            gulp.src([`./node_modules/material-design-icons/${category}/svg/production/*_24px.svg`])
                .pipe(svgSprite(getSvgSpriteConfig(category))))
        .thru(merge)
        .value()
        .pipe(replace(/id=\"ic_([0-9a-zA-z_]+)_24px\"/g, function (pattern, replacement) {
            var out = replacement.replace(/_/g, '-');
            return 'id="' + out + '"';
        }))
        .pipe(gulp.dest('./dist')));

gulp.task('copy-package', () => {
    return gulp.src([
        'package.json'
    ])
        .pipe(gulp.dest('dist'));
})

function getSvgSpriteConfig(category) {
    return {
        shape: {
            dimension: {
                maxWidth: 24,
                maxHeight: 24
            },
        },
        mode: {
            css: {
                bust: false,
                dest: './',
                sprite: `./svg-sprite-${category}.svg`,
            },
        }
    };
}
