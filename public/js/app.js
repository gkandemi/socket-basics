var socket = io();

socket.on("connect", function(){
    console.log("connected to the server");
})

socket.on("message", function(message){
    console.log("New Message");
    console.log(message.text);
    var momentTimestamp = moment.utc(message.timestamp).local().format("H:mm");
    
    $(".messages").append("<p><strong>[" + momentTimestamp + "]</strong> " + message.text + "</p>");
})

var $form = jQuery("form#message_form");

$form.on("submit", function(event){

    event.preventDefault();

    var $message = $form.find("input[name='message']");
    socket.emit('message', {
        text: $message.val(),
    })

    $message.val("");
    $message.focus();

})