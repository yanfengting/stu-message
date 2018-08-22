$(".remove").click(function(){
    // list.ejs写 data-id="<%=students[i].id %>"
    var id = $(this).data('id');
    $.post('/students/remove',{id},function(data){
        if(data.code != 200){
            $('#myModal .modal-body').text(data.message);
            $('#myModal').modal();
            return;
        }
        location.href = "/students/list";
        // 刷新 location.reload
    })
})

$('#btnRemove').click(function(){
    var selected = $('.selectSingle:checked');
    if(selected.length <= 0){
        $('#myModal .modal-body').text("请选择要删除的数据");
        $('#myModal').modal();
        return;
    }
    // each循环每一个
    var ids = '';
    selected.each(function(i,ele){
        // console.log(ele);//input
        // console.log($(ele).data('id'));
        ids += $(ele).data('id') + ','
    })
    console.log(ids);
    if(ids.length > 0){
        // ','去掉
        ids = ids.substring(0, ids.length - 1);
    }
    $.post('/students/multiRomove',{ids},function(data){
        if(data.code !=200){
            $('#myModal .modal-body').text("请选择要删除的数据");
            $('#myModal').modal();
            return;
        }
        location.href = '/students/list';
    })
})
// 全选框
$('.selectAll').click(function(){
    // prop操作input 自定义属性
    // attr 万能 取任何属性
    // data video button和CheckBox
    $('.selectSingle').prop('checked',$(this).prop('checked'))
})
// 所有框全选以后上面的也勾上
$('.selectSingle').click(function(){
    /*var selected = $('.selectSingle:checked');
     if(selected.length == $('.selectSingle').length){
        $('.selectAll').prop('checked',true)
    }else{
        $('.selectAll').prop('checked',false)
    } */
    $('.selectAll').prop('checked',$('.selectSingle:checked').length == $('.selectSingle').length)
})