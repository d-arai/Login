// データベース(MongoDB)のI/F
// - DB接続
// - スキーマの登録
// - モデルの登録・利用開始

// DB接続
var mongoose = require('mongoose');
var url = 'mongodb://localhost/user';
var db  = mongoose.createConnection(url, function(err, res){
    if(err){
        console.log('Error connected: ' + url + ' - ' + err);
    }else{
        console.log('Success connected: ' + url);
    }
});

// スキーマの登録
var UserSchema = new mongoose.Schema({
    email    : { type: String, unique: true },
    password  : String
},{collection: 'info'});

// モデルの登録・利用開始
exports.User = db.model('User', UserSchema);




