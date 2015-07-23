var express = require('express');
var router = express.Router();

var model = require('../model');
var User = model.User;

// メインページ*/
router.index = function(req, res){
    res.render('index', { user: req.session.user});
    console.log(req.session.user);
};

// ユーザー登録
router.add = function(req, res){
    var newUser = new User(req.body);
    newUser.save(function(err){
        if(err){
            if (err.code === 11000) {
                console.log("the email is already used");
            }
            else {
                console.log(err);
            }
            res.redirect('back');
        }else{
            console.log("add success and redirect to '/'");
            req.session.user = req.body.email;
            res.redirect('/');
        }
    });
};

// ユーザー削除
router.delete = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var query = { "email": email, "password": password };
    User.remove(query, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            // アカウント削除
            console.log("account deleted");
        }
        res.render('login');
    });
};

// ログイン
router.login = function(req, res){
    var email    = req.query.email;
    var password = req.query.password;
    var query = { "email": email, "password": password };
    User.find(query, function(err, data){
        if(err){
            console.log(err);
        }
        if(data == ""){
            res.render('login');
        }else{
            req.session.user = email;
            res.redirect('/');
		    console.log(data);
        }
    });
};

// ログアウト
router.logout = function (req, res) {
    req.session.destroy();
    console.log('deleted sesstion');
    res.redirect('/');
};

module.exports = router;

