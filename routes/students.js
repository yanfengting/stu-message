var express = require('express');
var router = express.Router();

var pool = require('../modules/db.js');
var md5 = require('md5');
var checklogin = require('../modules/checkLogin.js');
var pager = require('../modules/pager.js');

router.get('/add', checklogin, function (req, res, next) {
    // 查询专业班级院系的信息，在add.ejs里面获取
    var sql = `
    SELECT * FROM majors WHERE status = 0;
    SELECT * FROM classes WHERE status = 0;
    SELECT * FROM departments WHERE status = 0;`
    pool.query(sql, function (err, result) {
        if (err) {
            res.json({ code: 201, message: '数据库操作异常！' })
            return;
        }
        // console.log(result);
        var majors = result[0];
        var classes = result[1];
        var departments = result[2];

        res.render('students/add', { title: '学生添加！', majors, classes, departments });

    })
});
router.post('/add', checklogin, function (req, res, next) {
    // shift+alt+向下
    var sno = req.body.sno;
    var name = req.body.name;
    var sex = req.body.sex;
    var birthday = req.body.birthday;
    var card = req.body.card;
    var majorId = req.body.majorId - 0; //转化数字
    var classId = req.body.classId - 0;
    var departId = req.body.departId - 0;
    var nativePlace = req.body.nativePlace;
    var address = req.body.address;
    var qq = req.body.qq;
    var phone = req.body.phone;
    var email = req.body.email;
    // console.log(sno);
    //1.服务器端判断先省略
    if (!sno || !name || !sex || !birthday || !card || majorId == -1 || classId == -1 || departId == -1) {
        res.json({ code: 201, message: '学号，姓名，性别，生日，身份证号,所学专业，所属班级，所属院系不能为空' });
        return;
    }
    // 2.操作数据库
    // 2.1 验证数据库是否存在sno 已存在
    pool.query("SELECT * FROM students WHERE sno = ?", [sno], function (err, result) {
        if (err) {
            res.json({ code: 201, message: '数据库操作异常！' })
            return;
        }
        if (result.length > 0) {
            res.json({ code: 202, message: '你添加的学生已存在！' })
            return;
        }
        // 2.2向students和users表插入数据
        var sql = `INSERT INTO students(sno,name,sex,birthday,card,majorId,classId,departId,nativePlace,address,qq,phone,email,status,createTime,createUserId)VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        var data = [sno, name, sex, birthday, card, majorId, classId, departId, nativePlace, address, qq, phone, email, 0, new Date(), req.session.user.id];
        pool.query(sql, data, function (err, result1) {
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
})
router.get('/list', checklogin, function (req, res, next) {
    var sql = `
    SELECT * FROM majors WHERE status = 0;
    SELECT * FROM classes WHERE status = 0;
    SELECT * FROM departments WHERE status = 0;
    SELECT COUNT(*) as totalCount FROM students;
    SELECT s.id,s.sno,s.name,s.sex,s.birthday,s.card,s.majorId,s.classId,s.departId,s.nativePlace,s.address,s.qq,s.phone,s.email,s.status,s.createTime,s.createUserId,s.updateTime,s.updateUserId, 
    d.name as departName, 
    m.name as majorName, 
    c.name as className, 
    u1.loginName as createUserName, 
    u2.loginName as updateUserName 
    FROM students s
    LEFT JOIN departments d ON s.departId = d.id
    LEFT JOIN majors m ON s.majorId = m.id
    LEFT JOIN classes c ON s.classId = c.id
    LEFT JOIN users u1 ON s.createUserId = u1.id
    LEFT JOIN users u2 ON s.updateUserId = u2.id
    where (1=1)
    `;
    // console.log(req.query.sno);

    //搜索功能
    var sno = req.query.sno;
    var name = req.query.name;
    var sex = req.query.sex;
    var majorId = req.query.majorId;
    var classId = req.query.classId;
    var departId = req.query.departId;
    var status = req.query.status;
    var birthdayBegin = req.query.birthdayBegin;
    var birthdayEnd = req.query.birthdayEnd;
    var card = req.query.card;

    if(sno){
        sql += ` AND s.sno like '%${sno}%'`;
    }
    if(name){
        sql += ` AND s.name like '%${name}%'`;
    }
    if(sex && sex != -1){
        sql += ` AND s.sex='${sex}'`;
    }
    if(majorId && majorId != -1){
        sql += ` AND s.majorId='${majorId}'`;
    }
    if(classId && classId != -1){
        sql += ` AND s.classId='${classId}'`;
    }
    if(departId && departId != -1){
        sql += ` AND s.departId='${departId}'`;
    }
    if(status && status != -1){
        sql += ` AND s.status='${status}'`;
    }
    /* */
    
    if(birthdayBegin && birthdayEnd){
        try{
            var begin = new Date(birthdayBegin);
            var end = new Date(birthdayEnd);
            console.log(begin-end);
            if(begin >= end){
                sql += ` AND s.birthday >='${birthdayEnd}' AND s.birthday <='${birthdayBegin}' `
            }else{
                sql += ` AND s.birthday >='${birthdayBegin}' AND s.birthday <='${birthdayEnd}' `
            }
        }catch(error){
            res.json({code:201,message:"日期输入有误！"});
            return;
        }    
    }else{
        if(birthdayBegin){
            sql += ` AND s.birthday>='${birthdayBegin}'`;
        }
        if(birthdayEnd){
            sql += ` AND s.birthday<='${birthdayEnd}'`;
        } 
    }
    if(card){
        sql += ` AND s.card like '%${card}%'`;
    }
    var page = req.query.page || 1;
    page = page - 0;//转换字符串
    var pageSize = 10;
    /*(page -1)*pageSize,pageSize
     0,10
    10,10
    20,10 */
    sql += ` LIMIT ${(page -1) * pageSize},${pageSize}`;

    pool.query(sql, function (err, result) {
        if (err) {
            res.json({ code: 201, message: '数据库操作异常！' })
            return;
        }
        // 取当前表数据的总记录数
        var totalCount = result[3][0].totalCount;//1999        
        var totalPage = Math.ceil(totalCount / pageSize);//1999/10=200
        var pages = pager(page,totalPage);
            console.log(page);
                console.log(pages);
                console.log(totalPage);//200
                console.log(totalCount);
                console.log(pager(1,totalPage));
                console.log(pager(2,totalPage));
                console.log(pager(3,totalPage));
                console.log(pager(4,totalPage));
                console.log(pager(5,totalPage));
                console.log(pager(6,totalPage));
                console.log(pager(7,totalPage));
                console.log(pager(198,totalPage));
                console.log(pager(199,totalPage));
        
            res.render('students/list', { 
            title: '学生列表！', 
            students: result[4],
            majors:result[0],
            classes:result[1],
            departments:result[2],
            // 总页码显示到客户端
            pageInfo:{
                page,//当前页
                pages,//要在视图上显示的页码范围
                pageSize,//每页显示的个数
                totalPage,//总页数
                totalCount//表中数据的总记录数
            }
        }); 
    });
});
// :id占位符，把客户端传过来的数据放到id变量中
router.get('/edit/:id', checklogin, function (req, res, next) {
    // params=parameter
    var id = req.params.id;
    if (!id) {
        res.json({ code: 201, message: '参数id必填' });
        return;
    }
    // [[],[],[],[]]
    pool.query(
    `select * from students where id = ?;
    SELECT * FROM majors WHERE status = 0;
    SELECT * FROM classes WHERE status = 0;
    SELECT * FROM departments WHERE status = 0;
    `, [id], function (err, result) {
            if (err) {
                res.json({ code: 202, message: '数据库操作异常！' });
                return;
            }
            if (result[0].length != 1) {
                res.json({ code: 203, message: '你编辑的学生不存在！' });
                return;
            }
            // 查找视图 传参数 result[0]是一个数组[0]取它的对象
            res.render('students/edit', {
                title: '编辑学生',
                student: result[0][0],
                majors: result[1],
                classes: result[2],
                departments: result[3]
            });
        })
})
router.post('/edit', checklogin, function (req, res, next) {
    var id = req.body.id;
    var sno = req.body.sno;
    var name = req.body.name;
    var sex = req.body.sex;
    var birthday = req.body.birthday;
    var card = req.body.card;
    var majorId = req.body.majorId - 0; //转化数字
    var classId = req.body.classId - 0;
    var departId = req.body.departId - 0;
    var nativePlace = req.body.nativePlace;
    var address = req.body.address;
    var qq = req.body.qq;
    var phone = req.body.phone;
    var email = req.body.email;
    // console.log(sno);
    //1.服务器端判断先省略
    if (!id || !sno || !name || !sex || !birthday || !card || majorId == -1 || classId == -1 || departId == -1) {
        res.json({ code: 201, message: '主键，学号，姓名，性别，生日，身份证号,所学专业，所属班级，所属院系不能为空' });
        return;
    }

    pool.query(`select * from students where id=?`, [id], function (err, result) {
        if (err) {
            res.json({ code: 202, message: '数据库操作异常！' });
            return;
        }
        if (result[0].length > 1 || result[0].length < 1) {
            res.json({ code: 203, message: '你编辑的学生不存在！' });
            return;
        }

        var sql = `UPDATE students set sno=?,name=?,sex=?,birthday=?,card=?,majorId=?,classId=?,departId=?, nativePlace=?, address=?, qq=?, phone=?,updateTime=?,updateUserId=? where id=?`;
        var date = [sno, name, sex, birthday, card, majorId, classId, departId, nativePlace, address, qq, phone, email, new Date(), req.session.user.id, id];
        pool.query(sql, date, function (err, result1) {
            if (err) {
                res.json({ code: 202, message: '数据库操作异常！' });
                return;
            }
            res.json({ code: 200, message: "编辑成功" });
        })
    });
})
router.post('/remove',checklogin,function(req, res, next){
    var id = req.body.id;
    if(!id){
        res.json({ code: 201, message: '参数错误！' });
        return;
    }
    pool.query(`update students set status=1 where id=?`,[id],function(err,result){
        if(err){
            res.json({ code: 201, message: '数据库操作异常！' });
            return;
        }
        res.json({ code: 200, message: '删除成功！' });
    })
})

router.post('/multiRomove',checklogin,function(req, res, next){
    var ids = req.body.ids;
    if(!ids){
        res.json({code:201,message:"参数错误！"});
        return;
    }
    pool.query(`update students set status=1 where id in (${ids})`,function(err,result){
        if(err){
            res.json({code:201,message:"数据库操作异常！"});
            return;
        }
        res.json({code:200,message:"批量删除成功！"});
    });
})
module.exports = router;
