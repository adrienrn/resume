var exec          = require('child_process').exec;
var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();

gulp.task('browser-sync', function(cb) {
  browserSync.init({
    open: false,
    port: 9000,
    server: {
      baseDir: './dist/',
    },
  });
});

gulp.task('build', function(cb) {
  exec('yarn hackmyresume:build', function (err, stdout, stderr) {
    cb(err);
  });
});

gulp.task('watch', function(cb) {
  gulp.watch('src/**/*', {usePolling: true}, gulp.series([
      'build',
      browserSync.reload,
    ])
  )
});

gulp.task('default', gulp.series('build', gulp.parallel(['browser-sync', 'watch'])));
