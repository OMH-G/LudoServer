const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const supabaseApi = require('./supabaseClient');
const configSupabase = require('./configSupabase');

const app = express();
const corsOptions = {
  origin: 'https://deployludo.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'pragma'], // Add 'pragma' to the list of allowed headers
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST']
//   }
// });

const PORT = 3001;
// let corsOptions = { 
//   origin : ['https://deployludo.vercel.app'], 
// } 
 

app.get('/fetchroom', async (req, res) => {
  const data = await supabaseApi.fetchRooms();
  res.send({ message: data });
});
app.post('/fetchusersbyid', async (req, res) => {
  let roomid=req.body
  const data = await supabaseApi.fetchUserbyRoomID(roomid);
  res.send({ message: data });
});
app.post('/getChips', async (req, res) => {
  let param=req.body
  const data = await supabaseApi.getChips(param);
  res.send({ message: data['chips'] });
});

app.post('/roomUser', async (req, res) => {
  let param = req.body;
  const data = await supabaseApi.fetchroomidbyusername(param);
  // const data = await supabaseApi.fetchRooms();

  res.send(data);
});
app.post('/fetchownerbyid', async (req, res) => {
  let param = req.body;
  const data = await supabaseApi.fetchroomowner(param);
  // const data = await supabaseApi.fetchRooms();

  res.send({'message':data});
});

app.post('/createRoom', async (req, res) => {
  let param = req.body;
  roomdata = await supabaseApi.createRoomInSupabase(param);
  res.send({ message: roomdata.id });
});
app.post('/fetchroombyid', async (req, res) => {
  let param = req.body;
  roomdata = await supabaseApi.fetchRoomsById(param);
  res.send({ message: roomdata });
});

server.listen(PORT, () => {
  console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
});
