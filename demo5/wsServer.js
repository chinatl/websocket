var app = require('http').createServer()
var io = require('socket.io')(app);

app.listen(3000,function(){
    console.log('websocket server is listening in 3000 port')
});
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});