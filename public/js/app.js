var socket = io();

socket.on("connect", function(){
    console.log("connected to the server");
})

socket.on("message", function(message){
    console.log("New Message");
    console.log(message.text);
})