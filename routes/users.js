var express = require('express');
var router = express.Router();

var pool = require('../modules/db.js');
var md5 = require('md5');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login',{
    title:'登录'
  })
});
router.post('/login', function(req, res, next) {
  var loginName = req.body.loginName;
  var password = req.body.password;
  var type = req.body.type;
  var remember = req.body.remember;
  if(!loginName || !password) {
    res.json({
      code:201,
      message:"账号或密码不能为空!"
    });
    return;
  }
pool.query("SELECT * FROM `users` where loginName=? AND password=? AND type=?",[loginName,md5(password),type],function(err,result){
  
  if(err){
    res.json({code:202,message:"数据库操作失败！"})
    return;
  }
  if(result.length == 0){
    res.json({code:203,message:"账号或密码或者类型有误！"})
    return;
  }
  if(result.length > 1){
    res.json({code:204,message:"你的账号异常！"})
    return;
  }

  var user = result[0];
  if(user.status != 0){
    res.json({code:205,message:"你的账号被禁用或删除！"})
    return;
  }
  delete user.password;
  req.session.user = user;
  // user 自己起的
  // req.session.user =  {
  //   id : user.id,
  //   loginName : user.loginName,
  //   type:user.type,
  //   status:user.status
  // }
  // 请求是客户端
  req.session.save();

  console.log(req.session.user);
  // 服务器端
  res.cookie('user',user)

  res.json({code:200,message:"成功！"});
})

  // console.log(type);
  // console.log(remember);
  // res.json({code:200});
});

module.exports = router;
