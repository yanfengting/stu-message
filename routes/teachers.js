var express = require('express');
var router = express.Router();

var pool = require('../modules/db.js');
var md5 = require('md5');
var checklogin = require('../modules/checkLogin.js');

router.get('/add',checklogin,function(req, res, next) {
  res.render('teachers/add', { title: '教师添加！' });
});

router.get('/list',checklogin, function(req, res, next) {
    res.render('teachers/list', { title: '教师查询！' });
  });
router.post('/add',function(req, res, next){
  var tno = req.body.tno;
  var name = req.body.name;
  var sex = req.body.sex;
  var birthday = req.body.birthday;
  var card = req.body.card;
  var majorId = req.body.majorId;
  var classId = req.body.classId;
  var departId = req.body.departId;
  var nativePlace = req.body.nativePlace;
  var address = req.body.address;
  var qq = req.body.qq;
  var phone = req.body.phone;
  var email = req.body.email;
  console.log(tno);
   
  var sql = `INSERT INTO teachers(tno,name,sex,birthday,card,majorId,classId,departId,nativePlace,address,qq,phone,email,status,createTime,createUserId)VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  var data = [tno, name, sex, birthday, card, majorId, classId, departId, nativePlace, address, qq, phone, email, 0, new Date(), req.session.user.id];
 
  pool.query(sql, data, function (err, result) {
    if (err) {
        res.json({ code: 201, message: '数据库操作异常！' })
        return;
    }
    
    pool.query("INSERT INTO users(loginName, password, type, status)VALUE(?,?,?,?)", [name, md5('123456'), 2, 0], function (err, result2) {
        if (err) {
            res.json({ code: 201, message: "数据库操作异常！" });
            return;
        }

        res.json({ code: 200, message: '保存成功！' })
    })
})
   
});
module.exports = router;