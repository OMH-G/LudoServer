const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const supabaseApi = require('./supabaseClient');
const Cookies = require('cookies');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config()

app.use(cors({
  credentials:true,
  origin:['http://localhost:3000','https://ludokings.vercel.app','https://kingsludo.com'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
const PORT = 3001;
let supToken=null;
let suptok=null;
let clerk_token=null;
let decoded_ses=null;
function authenticate(req, res, next) {
  const cookies = new Cookies(req, res);
  const sessToken = cookies.get('__session');
  const token = cookies.get('__clerk_db_jwt');
  supToken=req.body['token']
  // supToken=suptok
  // console.log(suptok['token'])
  // supToken=Object.keys(JSON.parse(JSON.stringify(req.body)))[0]
  if (sessToken === undefined && token === undefined) {
    res.status(401).json({ error: 'Not signed in' });
    return;
  }

  try {
    let decoded_tok = jwt.verify(token, process.env.CLERK_PEM);
    console.log(decoded_tok)
    decoded_ses = jwt.verify(supToken, process.env.SUPABASE_SECRET_KEY,{algorithms:['HS256']});
      req.sessToken = supToken;
    next(); // Continue with the next middleware or route
  } catch (error) {
    res.status(400).json({
      error: 'Invalid Token',
    });
  }
}

app.use(authenticate);
app.get('/fetchroom',async (req, res) => {
  // let auth=req.sessToken

  const data = await supabaseApi.fetchRooms();
  res.send({ message: data });
});
app.post('/fetchusersbyid', async (req, res) => {
  let {id}=req.body
  // let auth=req.sessToken

  const data = await supabaseApi.fetchUserbyRoomID(id);
  console.log(data);
  res.send({ message: data });
});
app.post('/getChip', async (req, res) => {
  // let auth=req.sessToken
  let userid=decoded_ses['userid']
  // console.log(auth,param);
  const data = await supabaseApi.getChips(userid);
  if(data && data.length!==0){
    res.send({ message: data[0]['chips'] });
  }
  else{
    res.send({message:0});
  }
});

app.post('/roomUser', async (req, res) => {
  // const cookies = new Cookies(req, res);
  let auth=req.sessToken
  let param = req.body;
  const data = await supabaseApi.fetchroomidbyusername(param);
  // const data = await supabaseApi.fetchRooms();
  
  res.send(data);
});
app.post('/fetchownerbyid', async (req, res) => {
  // let auth=req.sessToken

  let param = req.body;
  console.log("Owner din",param)
  const data = await supabaseApi.fetchroomowner(param['id']);
  // const data = await supabaseApi.fetchRooms();
  
  res.send({'message':data});
});

app.post('/createRoom', async (req, res) => {
  // let auth=req.sessToken

  let param = req.body;
  // roomhistory=await supabaseApi.createRoomInSupabaseRoomHistory(param);
  roomdata = await supabaseApi.createRoomInSupabase(param);
  res.send({ message: roomdata.id });
});
app.post('/fetchroombyid', async (req, res) => {
  // let auth=req.sessToken

  let param = req.body;
  roomdata = await supabaseApi.fetchRoomsById(param);
  res.send({ message: roomdata });
});
app.post('/addUserToDB', async (req, res) => {
  // let auth =req.sessToken
  // let payload=req.Token
  let param = {'userId':decoded_ses['userid'],'username':decoded_ses['username']};
  let data = await supabaseApi.createUserInSupabase(param);
  res.send({ message: data });
});

app.post('/gamesPlayed', async (req, res) => {
  let userid = decoded_ses['userid']
  console.log(decoded_ses)
  let data = await supabaseApi.gamesPlayed(userid);
  console.log(data);
  res.send({ message: data });
});
app.post('/gameStats', async (req, res) => {
  let userId=decoded_ses['userid']
  const winAmount = await winChips(userId);
    const loseAmount = await loseChips(userId);

    const gameStats = {
      winAmount: winAmount.win_amount,
      loseAmount: loseAmount.lose_amount,
    };
  res.send({ message: gameStats });
});
app.post('/roomCode', async (req, res) => {
    const min = 100;
    const max = 99999999;

    const random8DigitNumber =
      Math.floor(Math.random() * (max - min + 1)) + min;

    const formattedNumber = String(random8DigitNumber).padStart(8, "0");
    
    
    const data=await supabaseApi.fetchroomidbyuserid(decoded_ses['userid']);
    console.log(data)
    const roomOwner=await supabaseApi.fetchroomowner(data)
    console.log(roomOwner)
    const roomdata=await supabaseApi.RoomCode(data,formattedNumber,roomOwner,decoded_ses['username'])

    console.log("alskflasdkflasdfkasldfklasdfklasfdklasdkflasdkflasdfklasdfk",roomdata);


    if(roomOwner===decoded_ses['username']){
     const amount=roomdata['value']
     const players=await supabaseApi.fetchUserbyRoomID(roomdata['id'])
    const getUserId1 = await supabaseApi.getUserIdByName(players[0].name);
    const getUserId2 = await supabaseApi.getUserIdByName(players[1].name);
    // // console.log(getUserId1.user_id);

    const userChips1 = await supabaseApi.getChips(getUserId1.user_id);
    if (amount <= userChips1) {
      let final1 = userChips1 - amount;
      await supabaseApi.updateChips(getUserId1.user_id, final1);
    }
    const userChips2 = await supabaseApi.getChips(getUserId2.user_id);
    if (amount <= userChips2) {
      let final2= userChips2 - amount;
      await supabaseApi.updateChips(getUserId2.user_id, final2);
    }
    console.log('--------------------userchips1',userChips1,userChips2)
  }
    // Delay for 5 seconds
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    res.send({code:roomdata.roomcode})
});
// app.post('/addMoney',async(req,res)=>{
//   console.log(req.body)
// })
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
});
