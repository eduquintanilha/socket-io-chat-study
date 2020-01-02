    var socket = io('https://3000-aae43d19-ce65-4d50-ad5d-886b104691e2.ws-us02.gitpod.io');

   
    
    socket.on('connect', () => {
        console.log(socket.id);
    });



    $('#chat').submit(function(event) {
        event.preventDefault();

        var author = $('input[name=username]').val();
        var message = $('input[name=message]').val();

        if(author.length && message.length) {
            var messageObject = {
                author: author,
                message: message,
            };

            socket.emit('sendMessage', messageObject);
        }
    })