var PORT = process.env.PORT || 3000;

var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var moment = require("moment");
var now = moment();

app.use(express.static(__dirname + "/public"));

io.on('connection', function (socket) {
    console.log("user connected via sockect.io!!!");

    socket.on('message', function (message) {
        console.log('Message received : ' + message.text);

        // io.emit // mesajı gönderen dahil herkese gönder...
        // mesaji gönderen haric herkese gönder...
        // socket.broadcast.emit('message', message);
        message.timestamp = moment().valueOf();
        io.emit('message', message);

    })

    socket.emit("message", {
        text: 'Welcome to the chat application!!',
        timestamp : moment().valueOf()
    })
})

http.listen(PORT, function () {
    console.log("server is running...");
})