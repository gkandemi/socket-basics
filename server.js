var PORT = process.env.PORT || 3000;

var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var moment = require("moment");
var now = moment();

app.use(express.static(__dirname + "/public"));

var clientInfo = {};

io.on('connection', function (socket) {
    console.log("user connected via sockect.io!!!");

    // joinRoom event'ini kontrol edip ona göre odaya katılma işlemini gerçekleştiriyoruz..
    socket.on("joinRoom", function (req) {

        clientInfo[socket.id] = req;

        socket.join(req.room);
        // belirli bir room için gonderim yapabiliriz..
        // socket.brodcast.to.emit('message', {});
        socket.to(req.room).emit('message', {
            name : "System",
            timestamp : moment().valueOf(),
            text: req.name + " has joined!!!"
        })
    })

    socket.on("disconnect", function(){
        var userData = clientInfo[socket.id];

        if(typeof userData !== "undefined"){
            socket.leave(userData.room);
            io.to(userData.room).emit("message", {
                name : "System",
                text : userData.name + " has left",
                timestamp : moment().valueOf()
            });
            delete clientInfo[socket.id];
        }
    })

    socket.on('message', function (message) {
        console.log('Message received : ' + message.text);

        // io.emit // mesajı gönderen dahil herkese gönder...
        // mesaji gönderen haric herkese gönder...
        // socket.broadcast.emit('message', message);
        message.timestamp = moment().valueOf();
        io.to(clientInfo[socket.id].room).emit('message', message);

    })

    socket.emit("message", {
        name: "System ",
        text: 'Welcome to the chat application!!',
        timestamp: moment().valueOf()
    })
})

http.listen(PORT, function () {
    console.log("server is running...");
})