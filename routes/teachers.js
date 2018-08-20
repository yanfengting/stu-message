var express = require('express');
var router = express.Router();

router.get('/add', checkLogin,function(req, res, next) {
  res.render('index', { title: '添加成功！' });
});

router.get('/list', checkLogin,function(req, res, next) {
    res.render('index', { title: '查询成功！' });
  });
  
module.exports = router;