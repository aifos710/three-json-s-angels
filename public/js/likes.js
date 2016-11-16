var socket = io.connect('http://localhost:1234', { 'forceNew': true });
var count=0;
socket.on('messages', function(data) {  
    console.log(data);
    $('#star').click(function(){
        var clicked = $(this).data('clicked');

        if ( clicked ) {
        	count--;
          $("#star").removeClass("star");
          $("#counter").html(count + "likes");
          
          socket.emit("like", count);

        }else{
           count++;
            $("#star").addClass("star");
            $("#counter").html(count + "likes");
        }

        $(this).data('clicked', !clicked);

        
    });
    
});


