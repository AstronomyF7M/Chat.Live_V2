// [PREVIEW_SIZE:400x300]
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);


const port = process.env.PORT || 3000;


// Serve static files from the public directory
app.use(express.static('public'));


// Socket.IO connection handler
io.on('connection', (socket) => {
 console.log('User connected:', socket.id);


 // Listen for new messages
 socket.on('new_message', (message) => {
 // Broadcast the message to all connected clients
 io.emit('new_message', {
 message: message,
 socket_id: socket.id
 });
 });


 // Handle disconnection
 socket.on('disconnect', () => {
 console.log('User disconnected:', socket.id);
 });
});


server.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
