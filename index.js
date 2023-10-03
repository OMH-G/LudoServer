const supabaseApi = require('./supabaseClient')
const express = require('express');
var cors = require('cors');

const app = express();
const PORT = 3001;
let  corsOptions = {
    "origin": "https://ludokings.vercel.app/",
    "methods": "GET,POST",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }

app.use(cors(corsOptions));

app.get('/fetchroom',async (req,res)=>{
    const data=await supabaseApi.fetchRooms();
    console.log(data)
    res.send({message:data});
})

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);