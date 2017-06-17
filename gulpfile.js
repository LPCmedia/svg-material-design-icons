var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('svg-sprites', function() {
  return gulp.src([
      'node_modules/material-design-icons/sprites/svg-sprite/*.svg',
      '!node_modules/material-design-icons/sprites/svg-sprite/*-symbol.svg',
  ])
    .pipe(replace(/id=\"ic_([0-9a-zA-z_]+)_24px\"/g, function(pattern, replacement) {
        var out = replacement.replace(/_/g,'-');
        return 'id="' + out + '"';
    }))
    .pipe(gulp.dest('dist'));
});
