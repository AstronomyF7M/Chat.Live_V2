// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;


app.use(express.static('public'));


io.on('connection', (socket) => {
 console.log('User connected:', socket.id);


 socket.on('new_message', (data) => {
 // Broadcast the message to all connected clients
 io.emit('new_message', {
 message: data.message,
 image: data.image, // Include image data
 socket_id: socket.id
 });
 });


 socket.on('disconnect', () => {
 console.log('User disconnected:', socket.id);
 });
});


server.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
