var PORT = process.env.PORT || 3000;

var express = require("express");
var app = express();
var http = require("http").Server(app);

app.use(express.static(__dirname + "/public"));

http.listen(PORT, function () {
    console.log("server is running...");
})