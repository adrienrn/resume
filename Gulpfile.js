var exec          = require('child_process').exec;
var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var flatten       = require('gulp-flatten');
var glob          = require('glob');

gulp.task('glob-test', function (cb) {
  gulp.watch([
    'src/**/*.hbs',
  ], {usePolling: true}, function (done) {
    console.log('Changes detected');

    done();
  });

  cb();
});

gulp.task('browser-sync', function(cb) {
  browserSync.init({
    open: false,
    port: 9000,
    server: {
      baseDir: './dist/',
    },
  });
});

gulp.task('build', function(cb, a, b) {
  console.log(a, b);
  exec('yarn hackmyresume:build', function (err, stdout, stderr) {

    if (err) {
      console.error(`exec error: ${err}`);

      return cb();
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    return cb();
  });
});

gulp.task('watch', function(cb) {
  gulp.watch([
    'src/**/*.hbs',
    'src/**/*.html',
    'src/**/*.json',
  ], {usePolling: true}, gulp.series([
      (done) => {
        console.log('detected');
        done();
      },
      'build',
      (done) => {
        browserSync.reload();
        done();
      },
    ])
  );

  // Avoid rebuilding everything for css changes !
  gulp.watch([
    'src/**/*.css',
  ], {usePolling: true}, gulp.series([
      (done) => {
        gulp
          .src('./src/**/html.css')
          .pipe(flatten())
          .pipe(gulp.dest('./dist/'))
          .pipe(browserSync.stream())
        ;

        done();
      },
    ])
  );

  cb();
});

gulp.task('default', gulp.series('build', gulp.parallel(['browser-sync', 'watch'])));
