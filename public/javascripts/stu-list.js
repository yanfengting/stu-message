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