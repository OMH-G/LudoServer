const io = require('socket.io-client');

// Replace 'http://your-websocket-server-url' with your WebSocket server URL
const socket = io('ws://localhost:3001');

socket.on('connect', () => {
  console.log('Connected to WebSocket server');

  // Send a message when the connection is open
  socket.emit('message', 'Hello, server!');
});

socket.on('message', (message) => {
  console.log('Received message from server:', message);

  // Handle incoming messages from the server
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected from WebSocket server:', reason);
});

socket.on('error', (error) => {
  console.error('Socket.IO Error:', error);
});
