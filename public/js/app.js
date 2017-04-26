var socket = io();
var name = getQueryVariable("name") || "Bilinmeyen";
var room = getQueryVariable("room") || "";

$(".room-title").text(room);

console.log(name + " joined " + room);


// client server'a baglandiginda fire olur..
socket.on("connect", function(){
    console.log("connected to the server");
    socket.emit("joinRoom", {
        name : name,
        room : room
    });
})

socket.on("message", function(message){
    console.log("New Message");
    console.log(message.text);
    var momentTimestamp = moment.utc(message.timestamp).local().format("H:mm");

    $messages = $(".messages");

    $messages.append("<p><strong>" + message.name + " " + momentTimestamp + "</strong></p>");
    $messages.append("<p>" + message.text + "</p>");
})

var $form = jQuery("form#message_form");

$form.on("submit", function(event){

    event.preventDefault();

    var $message = $form.find("input[name='message']");
    socket.emit('message', {
        name : name,
        text: $message.val()
    })

    $message.val("");
    $message.focus();

})