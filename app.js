var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

// セッション管理(MongoDB)モジュール
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());            // cookieのパースを行う。session定義のsecretを使用して行われる。

// セッション定義
// req中cookieのsessionIDを検索し、同じIDを持つセッションデータをreqに展開したり
// expireしていたら新たにセッションデータを作成したりするミドルウェア・・・と思う。
app.use(session({
    secret: 'secret',               // セッション情報の改ざん防止文字列
    store: new MongoStore({         // 使用DBの定義
        db: 'session',              // データベース名
        host: 'localhost',          // 接続先
        clear_interval: 60 * 60     // session一覧でexpireしているものを消去する周期[s]
    }),
    cookie: {                       // cookie定義
        httpOnly: true,             // クライアント側からcookieにアクセスできるかを設定。true：できない。(ブラウザによっては対応していない)
        maxAge: 60 * 60 * 1000      // cookieが消滅するまでの時間。(指定しないとブラウザ終了と同時に消滅)
    }
})); //追加

// ログインチェック
var loginCheck = function (req, res, next) {
    // セッションでユーザを検索
	if(req.session.user){
	  next();                       // 次の処理へ
	}
	else{
	  res.redirect('/login');       // Login画面へ
	}
};

// 下記は処理登録(イベント登録っぽい)。実処理は"index.js"。
app.get('/', loginCheck, routes.index);     // ログインチェック後にindexページへ
app.get('/login', routes.login);            // ログイン
app.post('/add', routes.add);               // アカウント登録
app.post('/delete', routes.delete);         // アカウント削除
app.get('/logout', routes.logout);          // ログアウト

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
