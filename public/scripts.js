var socket = io();



socket.on('connect', () => {
    console.log(socket.id);

});


socket.on('chatHistory', (history) => {
    console.log(history);

    var chatBox = document.querySelector('.messages');
    chatBox.value = '';

    if (history) {        
            var newMessage = document.createElement('p');
            newMessage.innerHTML = `<b>${history.author}</b> [${date()}]: ${history.message}`;

            console.warn(newMessage);
            chatBox.appendChild(newMessage);
        }    
});

var username = localStorage.getItem("username");
if (username) {
    document.querySelector('#username').setAttribute('style', 'display:none');
}
var chatHistory = null;

function date() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
}

$('#chat').submit(function(event) {
    event.preventDefault();

    document.querySelector('#username').setAttribute('style', 'display:none')


    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if (username) {
        author = username;
    }

    localStorage.setItem("username", author);

    if ((author.length || username.length) && message.length) {
        var messageObject = {
            author: author,
            message: message,
        };

        socket.emit('sendMessage', messageObject);

        document.querySelector('#text').value = '';


    }
})

socket.on('sendMessage', (msg) => {
    var chatBox = document.querySelector('.messages');
    var newMessage = document.createElement('p');
    newMessage.innerHTML = `<b>${msg.author}</b> [${date()}]: ${msg.message}`;

    chatHistory += newMessage.innerHTML;

    chatBox.appendChild(newMessage);

})