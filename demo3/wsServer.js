var ws = require("nodejs-websocket")
const PORT = 3000
var clientCount = 0
// Scream server example: "hi" -> "HI!!!" 
var server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCount++
    conn.nickname = 'user' + clientCount
    boardcast(conn.nickname + 'comes in')
    conn.on("text", function (str) {
        console.log("Received " + str)
        boardcast(str)
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        boardcast(conn.nickname + 'leave')
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
