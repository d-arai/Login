var express = require('express');
var router = express.Router();

var model = require('../model');
var User = model.User;

// ���C���y�[�W*/
router.index = function(req, res){
    res.render('index', { user: req.session.user});
    console.log(req.session.user);
};

// ���[�U�[�o�^
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

// ���[�U�[�폜
router.delete = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var query = { "email": email, "password": password };
    User.remove(query, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            // �A�J�E���g�폜
            console.log("account deleted");
        }
        res.render('login');
    });
};

// ���O�C��
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

// ���O�A�E�g
router.logout = function (req, res) {
    req.session.destroy();
    console.log('deleted sesstion');
    res.redirect('/');
};

module.exports = router;

