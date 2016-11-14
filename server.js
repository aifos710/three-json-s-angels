var express= require("express");
var app= express();
var http= require("http").Server(app);
var io= require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

app.set("public", __dirname+ "/public");

//sockets

io.sockets.on("connection", function(socket){
	socket.on("userimage", function(imagen){
		io.sockets.emit("addimage", "Image Received", imagen);
	})
})
app.get("/", function(req,res){
	res.render("search.html");

})

http.listen(3000, function(){
	console.log("Servidor encendido.");
});