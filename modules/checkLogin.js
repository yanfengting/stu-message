function checkLogin(req, res, next) {
    // console.log(req.session.user);
    if (!(req.session.user)) {
        res.render('login', { title: "登录" });
        return;
    }
    next();
}

module.exports = checkLogin;


// 引入自定义模块，checkLogin为什么不能直接require模块，必须导入路径

