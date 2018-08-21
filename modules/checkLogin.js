function checkLogin(req, res, next) {
    // console.log(req.session.user);
    if (!(req.session.user)) {
        res.render('login', { title: "登录" });
        return;
    }
    next();
}

module.exports = checkLogin;


