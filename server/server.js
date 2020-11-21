const http = require('http');
const express = require('express');
const socketio = require('socket.io');

//express handles the connection with a client.
const app = express(); 

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

// In order to serve static files to the client
app.use(express.static(clientPath));

//server listens to app that is associated with a client
const server =http.createServer(app)

// Pass socketio an http server, and it will return
// a server with which we can talk to our clients.
const io = socketio(server);


// To use socketio we need to listen to events.
// Whenever user connects to the server, we will recieve an event called connection.
// As an event listener, we recieve an objet called sock (sock represents a way of connecting to a specific client). 
io.on('connection', (sock) => {
    console.log('Someone connected');
    sock.emit('message', 'Hi, you are connected'); //sock sends to single client I am working with

    sock.on('message', (text) => {
        io.emit('message', text); //io sends to everyone.
    });
});


//We are listening for errors and will send to console if any server error occurs
server.on('error', (err) => {
    console.error('Server error:', err);
});

//Listen on port 8080
server.listen(8080, () => {
    console.log('Production game started on 8080');
});

