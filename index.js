var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usercount = 0;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});
io.on('connection', function(socket){
    console.log('a user connected');
    usercount++;
    io.emit("usercount",usercount);
    socket.on('disconnect', function(){
        console.log('user disconnected');
        usercount--;
        io.emit("usercount",usercount);
    });
});
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
});
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});