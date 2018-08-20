$('#btnSave').click(function (e) {
    //把默认的跳转阻止
    e.preventDefault();
    
    var data = {
        sno: $('#sno').val(),
        name: $('#name').val(),
        sex: $('#sex').val(),
        birthday: $('#birthday').val(),
        card: $('#card').val(),
        majorId: 1,
        classId: 1,
        departId: 1,
        nativePlace: $('#nativePlace').val(),
        address: $('#address').val(),
        qq: $('#qq').val(),
        phone: $('#phone').val(),
        email: $('#email').val()
    }
    // console.log(data);
    // 客户端判断省略
    $.post('/students/add', data, function (d) {
        // console.log(d);
    })
})
