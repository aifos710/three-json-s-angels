// $(document).ready(function(){

// 	//lenguajes
// 	$(document).ready(function() {
//     $('select').material_select();
//   });

// 	// 
// 	$('ul.tabs').tabs();
   
//    /* $('.dropdown-button').dropdown('open');
//     $('.dropdown-button').dropdown('close');*/
	
// })

var socket = io();
socket.on('addimage',function(msg,base64image){
	$('.mensajes')
	.append($('<p>').append($('<b>').text(msg),'<a target="_blank" href="'+base64image+'"><img src="'+base64image+'"/></a>'));
});
$(function(){
	$('#imagefile').on('change',function(e){
		var file=e.originalEvent.target.files[0];
		var reader= new FileReader();
		reader.onload=function(evt){
			socket.emit('user image',evt.target.result);
		};
		reader.readAsDataURL(file);
	});
});

// imprimir mensaje
function addMessage (data) {
  $('#messages').prepend('<li class="list-group-item">' +
      '<h4 class="list-group-item-heading">' + data.name + '</h4>' +
      '<p class="list-group-item-text">' + data.message + '</p>' +
  '</li>');
};

// This will be fired 
socket.on('messages-available', function (data) {
    for (var i = 0; i < data.length; i++) {
        addMessage(data[i]);
    }
});

// This listens for any individual messages coming back from the server
socket.on('message-added', addMessage);

// When someone clicks the "Create Message" button, we'll emit the data to the server
$('#create-message').submit(function (e) {

    // Don't let the form actually post to the server
    e.preventDefault();
    
    // Send the "add-message" message to the server with our values
    socket.emit('add-message', {
        name: $('input[name="name"]').val(),
        message: $('textarea[name="message"]').val()
    });

    // Clear out the message value
    $('textarea[name="message"]').val('');

});