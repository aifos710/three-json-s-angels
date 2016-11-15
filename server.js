var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [];
var sockets = [];

app.use(express.static(__dirname + '/public'));

io.sockets.on("connection", function(socket) {
	socket.on("user image", function (image) {
		io.sockets.emit('addimage','Image Received',image);
	});

	sockets.push(socket);
	socket.emit('messages-available', messages);
    socket.on('add-message', function (data) {
        messages.push(data);
        sockets.forEach(function (socket) {
            socket.emit('message-added', data);
        });
    });
});

// app.set('public',__dirname+'/public');
// app.set('public engine','html');


app.get('/',function(req,res){
	res.render('index');
})
server.listen(1234, function() {
	console.log("El servidor ha iniciado en el puerto 1234");
});