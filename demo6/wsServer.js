var app = require('http').createServer()
var io = require('socket.io')(app);
const PORT = 3000
var clientCount = 0
app.listen(PORT,function(){
    console.log('server is listing in the 3000 port')
});
io.on('connection',function(socket){
    clientCount ++
    socket.nickname = 'user' + clientCount;
    io.emit('enter',socket.nickname + 'comes in');
    socket.on('message',function(str){
        io.emit('message',socket.nickname + 'says :' + str)
    })
    socket.on('disconnect',function(str){
        io.emit('leave',socket.nickname +'leave')
    })
})

