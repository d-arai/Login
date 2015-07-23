// �f�[�^�x�[�X(MongoDB)��I/F
// - DB�ڑ�
// - �X�L�[�}�̓o�^
// - ���f���̓o�^�E���p�J�n

// DB�ڑ�
var mongoose = require('mongoose');
var url = 'mongodb://localhost/user';
var db  = mongoose.createConnection(url, function(err, res){
    if(err){
        console.log('Error connected: ' + url + ' - ' + err);
    }else{
        console.log('Success connected: ' + url);
    }
});

// �X�L�[�}�̓o�^
var UserSchema = new mongoose.Schema({
    email    : { type: String, unique: true },
    password  : String
},{collection: 'info'});

// ���f���̓o�^�E���p�J�n
exports.User = db.model('User', UserSchema);




