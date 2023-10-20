const WebSocket = require('ws');

// Replace 'ws://localhost:3001' with your WebSocket server URL
const serverUrl = 'ws://localhost:3001';

const socket = new WebSocket(serverUrl);

// Event listener for when the connection is established
socket.on('open', () => {
  console.log('Connected to the WebSocket server');

  // Send a message to the server once the connection is open
  socket.send(JSON.stringify('Hello, server!'));
});

// Event listener for incoming messages from the server
socket.on('message', (message) => {
  console.log('Received message from the server:', JSON.parse(message));

  // Handle incoming messages here
});

// Event listener for any errors that may occur
socket.on('error', (error) => {
  console.error('WebSocket Error:', error);
});

// Event listener for when the connection is closed
socket.on('close', (code, reason) => {
  console.log(`Connection closed (Code: ${code}, Reason: ${reason})`);
});
