var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

// �Z�b�V�����Ǘ�(MongoDB)���W���[��
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
app.use(cookieParser());            // cookie�̃p�[�X���s���Bsession��`��secret���g�p���čs����B

// �Z�b�V������`
// req��cookie��sessionID���������A����ID�����Z�b�V�����f�[�^��req�ɓW�J������
// expire���Ă�����V���ɃZ�b�V�����f�[�^���쐬�����肷��~�h���E�F�A�E�E�E�Ǝv���B
app.use(session({
    secret: 'secret',               // �Z�b�V�������̉�����h�~������
    store: new MongoStore({         // �g�pDB�̒�`
        db: 'session',              // �f�[�^�x�[�X��
        host: 'localhost',          // �ڑ���
        clear_interval: 60 * 60     // session�ꗗ��expire���Ă�����̂������������[s]
    }),
    cookie: {                       // cookie��`
        httpOnly: true,             // �N���C�A���g������cookie�ɃA�N�Z�X�ł��邩��ݒ�Btrue�F�ł��Ȃ��B(�u���E�U�ɂ���Ă͑Ή����Ă��Ȃ�)
        maxAge: 60 * 60 * 1000      // cookie�����ł���܂ł̎��ԁB(�w�肵�Ȃ��ƃu���E�U�I���Ɠ����ɏ���)
    }
})); //�ǉ�

// ���O�C���`�F�b�N
var loginCheck = function (req, res, next) {
    // �Z�b�V�����Ń��[�U������
	if(req.session.user){
	  next();                       // ���̏�����
	}
	else{
	  res.redirect('/login');       // Login��ʂ�
	}
};

// ���L�͏����o�^(�C�x���g�o�^���ۂ�)�B��������"index.js"�B
app.get('/', loginCheck, routes.index);     // ���O�C���`�F�b�N���index�y�[�W��
app.get('/login', routes.login);            // ���O�C��
app.post('/add', routes.add);               // �A�J�E���g�o�^
app.post('/delete', routes.delete);         // �A�J�E���g�폜
app.get('/logout', routes.logout);          // ���O�A�E�g

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
