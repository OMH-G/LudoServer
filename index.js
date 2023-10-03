const supabaseApi = require('./supabaseClient')
const express = require('express');

const app = express();
const PORT = 3000;


app.get('/',async (req,res)=>{
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