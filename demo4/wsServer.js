var ws = require("nodejs-websocket")
const PORT = 3000
var clientCount = 0
// Scream server example: "hi" -> "HI!!!" 
var server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCount++
    conn.nickname = 'user' + clientCount
    var mes = {}
    mes.type = 'enter'
    mes.data = conn.nickname + 'comes in'
    boardcast(JSON.stringify(mes))
    conn.on("text", function (str) {
        console.log("Received " + str)
        var mes = {}
        mes.type = 'message'
        mes.data = conn.nickname +'says:'+str
        boardcast(JSON.stringify(mes))
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        var mes = {}
        mes.type = 'leave'
        mes.data = conn.nickname + 'leave'
        boardcast(JSON.stringify(mes))
    })
    conn.on("error", function (err) {
        console.log('handle err')
        console.log(err)
    })
}).listen(PORT)

function boardcast(str) {
    server.connections.forEach(function (connetion) {
        connetion.sendText(str)
    })  
}
