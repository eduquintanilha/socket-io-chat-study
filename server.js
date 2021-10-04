const Database = require("@replit/database")
const express = require('express');
const path = require('path');

const db = new Database();
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

//var chatHistory = [];

io.on('connection', socket => {
    
    console.log(`Socket connected | Client_ID => ${socket.id}`);

    //Sending chat chatHistory
    /*db.get("chatHistory").then(value => {
        console.log(value);
        io.emit('chatHistory', value);
    });
    */
    
    // Get all db keys starting with match string
    db.list("chatHistory").then(matches => {       
        matches.forEach((key) => {
            // Deleting all keys
            //db.delete(key).then(() => {});

            db.get(key).then(value => {
                console.log(value);
                // Send chat key to frontend
                io.emit('chatHistory', value)
            })
        })           
    });
        


    socket.on('sendMessage', data => {
        console.log('Message received on server')
        console.log(data);
        
        // Add message to chat chatHistory DB
        db.set(`chatHistory_${Date.now()}`, data)
            .then(() => {
                console.log(`Added message to chatHistory DB`);
                console.log(data);
        })
    
        // Sending message to frontend
        io.emit('sendMessage', data);
    })
})



console.log('Server listening on port: 3000')
server.listen(3000);