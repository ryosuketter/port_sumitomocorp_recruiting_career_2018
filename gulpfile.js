var gulp = require('gulp');
var pug = require('gulp-pug');
var fs = require('fs');
var data = require('gulp-data');
var path = require('path');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');


// 開発用のディレクトリを指定します。
var src = {
  // 出力対象は`_`で始まっていない`.pug`ファイル
  'html': ['src/**/*.pug', '!' + 'src/**/_*.pug'],
  'sass': 'src/**/*.scss',
  'js': 'src/**/*.js',
  // JSONファイルのディレクトリを変数化。
  'json': 'src/_data/',
  'image': 'src/assets/img/**/*',
  'fonts': 'src/assets/fonts/**/*',
  'config': 'src/_@(redirects|headers)'
};


// 出力するディレクトリを指定します。
var dest = {
  'root': 'dest/',
  'html': 'dest/'
};


// `.pug`をコンパイルしてから、destディレクトリに出力します。JSONの読み込み、ルート相対パス、Pugの整形に対応しています。
gulp.task('html', function() {
  return gulp.src(src.html)
  // コンパイルエラーを通知します。
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(pug({
    // Pugファイルのルートディレクトリを指定します。
    // `/_includes/_layout`のようにルート相対パスで指定することができます。
    basedir: 'src',
    // Pugファイルの整形。
    pretty: true
  }))
  .pipe(gulp.dest(dest.root))
  .pipe(browserSync.reload({stream: true}));
});

var browsers = [
  'last 2 versions', // メジャーブラウザの最新の2バージョンに対応
  '> 5%', //シェア5%以上のブラウザに対応
  'ie = 11',
  'not ie <= 10', //バージョン10以前のIEを対象から外す。
  'ios >= 8', //iOS8以上
  'and_chr >= 5', // Chrome for Android 5以上
  'Android >= 5' //Android Browserは5以上
];


// cssファイルをdestディレクトリに出力（コピー）します。
gulp.task('css', function() {
  return gulp.src(src.css, {base: src.root})
  .pipe(gulp.dest(dest.root))
  .pipe(browserSync.reload({stream: true}));
});


// gulp sass で実行するタスク
gulp.task('sass', function () {
  gulp.src('src/assets/scss/*.scss')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(postcss([cssnext(browsers)]))
  .pipe(gulp.dest(dest.root + 'assets/css/'));
});


// imgファイルをdestディレクトリに出力（コピー）します。
gulp.task('image', function () {
  return gulp.src(src.image)
  .pipe(gulp.dest(dest.root + 'assets/img/'));
});

// fontsファイルをdestディレクトリに出力（コピー）します。
gulp.task('fonts', function () {
  return gulp.src(src.fonts)
  .pipe(gulp.dest(dest.root + 'assets/fonts/'));
});

// jsファイルをdestディレクトリに出力（コピー）します。
gulp.task('js', function() {
  return gulp.src(src.js, {base: src.root})
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(gulp.dest(dest.root))
  .pipe(browserSync.reload({stream: true}));
});


// ローカルサーバーを起動します。
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'dest/',
      index: "/index.html"
    }
  });
});

// PugのコンパイルやCSSとjsの出力、browser-syncのリアルタイムプレビューを実行します。
gulp.task('watch',['html', 'sass', 'js', 'image', 'fonts', 'browser-sync'], function() {
  gulp.watch(src.html[0], ['html']);
  gulp.watch(src.css, ['css']);
  gulp.watch(src.js, ['js']);
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.image, ['image']);
  gulp.watch(src.fonts, ['fonts']);
});

// _* ファイルをコピーします
gulp.task('netlify', function () {
  return gulp.src(src.config).pipe(gulp.dest(dest.root));
});

// 開発に使うタスクです。package.jsonに設定をして、`npm run default`で実行できるようにしています。
gulp.task('default', ['watch']);
gulp.task('build', ['html', 'sass', 'js', 'image','fonts', 'netlify']);
