$(document).ready(function() {
	$('select').material_select();
	$('ul.tabs').tabs();

	var socket= io();
	socket.on("addimage",function(msg, base64image){
		console.log(base64image);
		$(".mensajes").append(
			$("<p>").append(
				$("<b>").text(msg), "<a target='_blank' href='"+base64image+"'><img src='"+base64image+"'/></a>"
			)
		);
	});

	$(function(){
		//cuando la página cargue
		$("#imageFile").on("change", function(e){
			var file= e.originalEvent.target.files[0];
			var reader = new FileReader();
			reader.onload = function(evt){
				//se envia la imagen resultante
				socket.emit("userimage", evt.target.result);
			};
			reader.readAsDataURL(file);
		});
	})
});
