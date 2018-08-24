$('#btnSave').click(function (e) {
    //把默认的跳转阻止
    e.preventDefault();
    //客户端判断
    var sno = $.trim($('#sno').val());
    var name = $.trim($('#name').val());
    var sex = $.trim($('#sex').val());    
    var birthday = $.trim($('#birthday').val());
    var card = $.trim($('#card').val());
    
    var majorId = $.trim($('#majorId').val());
    var classId = $.trim($('#classId').val());
    var departId = $.trim($('#departId').val());
    
    if (!sno || !name || !sex || !birthday || !card || majorId == -1 || classId == -1 || departId == -1 ) {
        $('#myModal .modal-body').text('学号，姓名，性别，生日，身份证号,所学专业，所属班级，所属院系不能为空');
        $('#myModal').modal();
        return;
    }
    var nativePlace = $.trim($('#nativePlace').val());
    var address = $.trim($('#address').val());
    var qq = $.trim($('#qq').val());
    var phone = $.trim($('#phone').val());
    var email = $.trim($('#email').val());
    var data = {sno,name,sex, birthday,card,majorId,classId,departId,nativePlace ,address, qq,phone, email}
    // 客户端判断省略
    $.post('/students/add', data, function (d) {
        console.log(d);
        if(d.code != 200){
            $('#myModal .modal-body').text(d.message);
            $('#myModal').modal();
            return;
        }
        location.href = '/students/list';
    })
})
