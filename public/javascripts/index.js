$('#logout').on('click', function () {

  $.post('/logout', function (data) {
    if (data.code != 200) {
      $('#myModal .modal-body').text('注销出现异常!');
      $('#myModal').modal();
      return;
    }
    // href默认get请求，url地址也是
    location.href = '/login';
  }

  )
})

/* $('.list-group a').click(function(){
  console.log('sacf');
  $('.list-group').removeClass('active');
  $(this).addClass('active');
}) */

$('.list-group a').click(function(){
  $('.list-group a').click(this).attr('href');
})

  /* var activeLink = $('activeLink');
  if(!activeLink){
    $('.list-group a').removeClass('active');
  }else{
    $('.list-group a[href='+activeLink+']').addClass('active');
  } */

// 优化上面代码
var activeLink = $.cookie('activeLink');
$('.list-group a').removeClass('active');
if(activeLink){
  
  $('.list-group a[href='+activeLink+']').addClass('active');
}