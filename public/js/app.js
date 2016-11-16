// $(document).ready(function(){
var src;
//  //lenguajes
$(document).ready(function() {
  $(".imgShare").click(function(){
    $("#imageFile").click()
  });
   var count = 0;

  $('#mensajes').on("click", ".like", function(){
      var clicked = $(this).data('clicked');

      if ( clicked ) {
      count--;
      $(".like").removeClass("star");
      $("#counter").html(count +"Likes");
          
      }else{
         count++;
      $(".like").addClass("star");
      $("#counter").html(count +"Likes")
      }

      $(this).data('clicked', !clicked);
  });

  $('select').material_select();
  $('ul.tabs').tabs();
  $("#enviar").click(function(e){
    if(src != null){
      var post= $("#textarea1").val();
      socket.emit("userimage", {"src":src,
        "nombre": localStorage.getItem("nombre-unico"),
        "srcPerfil": localStorage.getItem("src"),
        "post": post
      });
      var post= $("#textarea1").val("");
      $(this).attr("href", "#test1");
    }
  })
  //<div class="lilMenu">
        //<i class="material-icons" id="star">star</i>
        //<i class="material-icons">chat_bubble_outline</i>
        //<i class="material-icons">call_split</i>
      //</div>
  var socket= io();
  socket.on("addimage",function(msg, datos){
    $("#mensajes").prepend(
      "<div class='chip bgw'>" +
        "<img class='proPic' src='"+datos.srcPerfil+"' alt='Contact Person'>" + 
        datos.nombre+
        "<div id='imagenPublicada'><a target='_blank' href='"+datos.src+"'><img src='"+datos.src+"' class='img'/></a></div></div>" + "<div class='lilMenu'><i class='material-icons like'>star</i><i class='material-icons'>chat_bubble_outline</i><i class='material-icons'>call_split</i></div>"+ "<div id='counter' class='counts'></div>"+"<div class='post'>"+ datos.post + "</div>"
    )
  });
    socket.on("nombresSrc", function(usuario){
      console.log(usuario.nombre);
    })


  $(function(){
    //cuando la página cargue
    var imagenFile= $("#imageFile");
    imagenFile.on("change", function(e){
      a(this);
    });
  })

  function a(a){
  if (a.files && a.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      src=  e.target.result;
      $(".imgShare img").attr("src", src);
  }
  reader.readAsDataURL(a.files[0]);
  }
  
}
  
//  //Modificando
});

$(function() {

  var app_id = '1214455281933900';
  var scopes = '';

  var btn_login = '<a href="#" id="login" class="btn btn-primary">Iniciar sesión</a>';

  var div_session = "<div id='facebook-session'>"+
            "<strong></strong>"+
            "<img>"+
            "<a href='#' id='logout' class='btn btn-danger'>Cerrar sesión</a>"+
            "</div>";

  window.fbAsyncInit = function() {

      FB.init({
        appId      : app_id,
        status     : true,
        cookie     : true, 
        xfbml      : true, 
        version    : 'v2.1'
      });


      FB.getLoginStatus(function(response) {
        statusChangeCallback(response, function() {});
      });
    };

    var statusChangeCallback = function(response, callback) {
      console.log(response);
      
      if (response.status === 'connected') {
          getFacebookData();
      } else {
        callback(false);
      }
    }

    var checkLoginState = function(callback) {
      FB.getLoginStatus(function(response) {
          callback(response);
      });
    }

    var getFacebookData =  function() {
      FB.api('/me', function(response) {
        localStorage.setItem("nombre-unico", response.name);
        localStorage.setItem("src", 'http://graph.facebook.com/'+response.id+'/picture?type=large');
        console.log(response);
        window.location = 'cinco.html';
      });
    }

    var facebookLogin = function() {
      checkLoginState(function(data) {
        if (data.status !== 'connected') {
          FB.login(function(response) {
            if (response.status === 'connected')
              getFacebookData();
          }, {scope: scopes});
        }
      })
    }

    var facebookLogout = function() {
      checkLoginState(function(data) {
        if (data.status === 'connected') {
        FB.logout(function(response) {
          $('#facebook-session').before(btn_login);
          $('#facebook-session').remove();
        });
      }
      });

    }



    $(document).on('click', '#login', function(e) {
      e.preventDefault();

      facebookLogin();
    });

    $(document).on('click', '#logout', function(e) {
      e.preventDefault();

      if (confirm("¿Está seguro?"))
        facebookLogout();
      else 
        return false;
    });

});