var express = require('express');
var router = express.Router();

router.get('/add',function(req, res, next) {
  res.render('index', { title: '教师添加！' });
});

router.get('/list', function(req, res, next) {
    res.render('index', { title: '教师查询！' });
  });

module.exports = router;