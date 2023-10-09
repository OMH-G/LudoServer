const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const supabaseApi = require('./supabaseClient');
const configSupabase = require('./configSupabase');

const app = express();
let allowedOrigins = ['https://deployludo.vercel.app/'];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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


app.get('/fetchroom',async (req, res) => {
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

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
});
