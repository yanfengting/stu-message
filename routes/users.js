var express = require('express');
var router = express.Router();

var pool = require('../modules/db.js');
var md5 = require('md5');

/* GET users listing. */
router.get('/login', function (req, res, next) { 
  // console.log(res.cookie('loginName')||'');
  res.render('login', {   
    title: '登录'
  })
});
router.post('/login', function (req, res, next) {
  var loginName = req.body.loginName;//body吧发过来的数据传过来
  var password = req.body.password;
  var type = req.body.type;
  var remember = req.body.remember ;

  // console.log(loginName);
  // console.log(password);

  if (!loginName || !password) {
    res.json({
      code: 201,
      message: "账号或密码不能为空!"
    });
    return;
  }
  pool.query("SELECT * FROM `users` where loginName=? AND password=? AND type=?", [loginName, md5(password), type], function (err, result) {

    if (err) {
      res.json({ code: 202, message: "数据库操作失败！" })
      return;
    }
    if (result.length == 0) {
      res.json({ code: 203, message: "账号或密码或者类型有误！" })
      return;
    }
    
    if (result.length > 1) {
      res.json({ code: 204, message: "你的账号异常！" })
      return;
    }
    // console.log(result.length); //1
    var user = result[0];
    if (user.status != 0) {
      res.json({ code: 205, message: "你的账号被禁用或删除！" })
      return;
    }
    // 把查询到的user存到session
    delete user.password;
    req.session.user = user; //后面的user是查询出来的
    req.session.save();
    // 服务器端
    res.cookie('user', user);
    // user 自己起的
    // 请求是客户端
    
    // console.log(req.session.user);
    // 输出RowDataPacket { id: 1, loginName: 'admin', type: 0, status: 0 }

    // console.log(typeof remember); //输出string
    // console.log(typeof false);//boolean
    //remember不转换，直接比较字符串
    if(remember === 'true'){
      res.cookie('loginName', user.loginName);
    } else{
      res.clearCookie('loginName');
    }

    res.json({ code: 200, message: "成功！" });
  })

  // console.log(type);
  // console.log(remember);
  // res.json({code:200});
});
router.post('/logout', function (req, res, next) {
  // 清空session和cookie
  req.session.user = null;
  res.clearCookie('user')//只能清除当前cookie
  // 向客户端响应数据，客户端再根据获取到的数据再进行跳转，我们称“客户端跳转（渲染）”（推荐），客户端渲染可以直接把接口和视图分成两个独立的项目，有利于业务逻辑和视图分离

  // 走到login.js
  // ajax跳转，代码多，view可以放到别的里面，接口和视图分开
  res.json({
    code: 200,
    message: '注销成功！'
  });
  // 以下两种方式都是“服务器端跳转‘渲染’”
  //方式1 直接跳转(/是指视图 名称) 跳转到views里面的login.ejs ，代码少,缺点是代码和router.get('/login')接口重复，并且浏览器显示的是logout,
  // 方式2
  // res.render('/login',{title:'登录'})
  //   /指的是上面的get请求 ，解决了方式1的缺点，推荐使用
  // res.redirect('/login');
});

module.exports = router;
