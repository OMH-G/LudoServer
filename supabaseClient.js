
let createClient = require("@supabase/supabase-js");
// const sup = require('./configSupabase');
// const supabase=require
require('dotenv').config()
const supabase = createClient.createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    global: { headers: { Authorization: `Bearer ${process.env.SUP_SECRET_KEY}` } },
  }
)
module.exports = {

  fetchRooms: async function () {
    try {
      let { data, error } = await supabase.from("Room").select("id,name,owner_name,value");
      return data;
    } catch (error) {
      console.error("Error creating room in Supabase:");
    }
  }
  ,
  assignroomid_user: async function (rid_uid_data = null) {
    
    try {
      const { data, error } = await supabase
        .from("User")
        .update({ "roomid": rid_uid_data["roomid"] })
        .eq("user_id", rid_uid_data["userid"])
        .select();
      return data;
    } catch (error) {
      console.error("Error creating room in Supabase:");
    }
  },
  fetchUserbyRoomID: async function (roomid) {
    try {
      const { data, error } = await supabase
        .from("User")
        .select("name")
        .eq("roomid", roomid);
      return data;
    } catch (error) {
      console.error("Error fetching room in Supabase");
    }
  },
  deassignroomid_user: async function (userid) {
    try {
      const { data, error } = await supabase
        .from("User")
        .update({ roomid: null })
        .eq("user_id", userid)
        .select();

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error creating room id in Supabase");
    }
  },
  fetchroomidbyuserid: async function (userid) {
    try {
      const { data, error } = await supabase
        .from("User")
        .select("roomid")
        .eq("user_id", userid);
      return data[0].roomid;
    } catch (error) {
      console.error("Error fetching roomid in Supabase using userid");
    }
  },
  fetchroomidbyusername: async function (username) {
    let un=username['username']
    let data = await supabase
      .from('Room')
      .select("*")
      .eq('owner_name', un)
      return data;
  },
  createRoomInSupabase: async function (data) {
    let userid = data['userId'];
    let name = data['newRoomName'];
    let value = data['newValue'];
    let username = data['userName']

    try {

      let check = await supabase
        .from("Room")
        .select("owned_by")
        .eq("owned_by", userid);
        
      if (check.data.length !== 0) {
        return {data:[]};
      }
      const data = await supabase
        .from("Room")
        .insert([
          {
            owned_by: userid,
            name: name,
            value: value,
            owner_name: username,
          },
        ])
        .select('id,name,value,owner_name');
      const history=await supabase
        .from("RoomHistory")
        .insert([
          {
            owned_by: userid,
            name: name,
            value: value,
            owner_name: username,
          },
        ])
        .select('id,name,value,owner_name');
      return data.data[0];
    } catch (error) {
      console.log('Error in creating room')
    }
  },
  createRoomInSupabaseRoomHistory: async function (
    data
  ) {

    let userid = data['userId'];
    let name = data['newRoomName'];
    let value = data['newValue'];
    let username = data['userName']
    try {
      const data = await supabase
        .from("RoomHistory")
        .insert([
          {
            owned_by: userid,
            name: name,
            value: value,
            owner_name: username,
          },
        ])
        .select();
      return "Room History Saved";
    } catch (error) {
      throw error;
    }
  },
  getChips: async function (userid) {
    // let userId=param
    try {
      const { data, error } = await supabase
        .from("User")
        .select('chips')
        .eq("user_id",userid)
        console.log('chiips',data);
      return data;
    } catch (error) {
      console.error("Error creating room in Supabase:");
    }
  },
  fetchRoomsById: async function (roomid) {
    let rid=roomid['id']
    try {

      let data= await supabase
        .from("Room")
        .select("name,value")
        .eq("id", rid);
      console.log(data);
      return data.data;
    } catch (error) {
      console.error("error fetching room from Supabase:");
    }
  },
  fetchroomowner: async function (roomid) {

    try {
      const { data, error } = await supabase
        .from("Room")
        .select("*")
        .eq("id", roomid);
      if(data.length!==0){

        return data[0].owner_name;
      }
    } catch (error) {
      console.error("Error Fetching room owner name from Supabase");
    }
  },
  createUserInSupabase: async function (param) {
    console.log(param['userId'],param['username'])
    try {
  
      let check = await supabase
        .from("User")
        .select("user_id")
        .eq("user_id", param['userId']);
      console.log(check);
      if (check===null || check.data.length !== 0) {
        return 'user Already created'
      }
      const { data, error } = await supabase
        .from("User")
        .insert([{ user_id: param['userId'], chips: 100, name: param['username'] }])
        .select();
        console.log(data)
      return "User created";
    } catch (error) {
      console.error('Error occured in creating user');
    }
  },
  gamesPlayed: async function (userid) {
    try {
      const { data, error } = await supabase
        .from("RoomHistory")
        .select()
        .eq("owned_by", userid);
      // .count();
      // The count is returned as data[0].count
      return data.length;
    } catch (error) {
      console.error("Error fetching games played in Supabase");
      throw error;
    }
  },
  
  winChips: async function (userid) {
  try {
    let data = await supabase
      .from("User")
      .select("win_amount")
      .eq("user_id", userid);

    return data.data[0];
  } catch (error) {
    console.error("Error fetching winChips in Supabase");
  }
},
loseChips: async function (userid) {
  try {
    let data = await supabase
      .from("User")
      .select("lose_amount")
      .eq("user_id", userid);

    return data.data[0];
  } catch (error) {
    console.error("Error fetching loseChips in Supabase");
  }
},

RoomCode: async function (id,RoomCode,owner,user){
  console.log(owner,user)
  try {
    console.log(id)
    const check = await supabase
      .from("Room")
      .select("*")
      .eq("id", id)
    console.log(check)
    if(check.data[0].roomcode!==null || owner!==user){
      return check.data[0]
    }
    const data = await supabase
      .from("Room")
      .update([{ roomcode:RoomCode }])
      .eq("id", id)
      .select('*')
    console.log('Room code is ',data);

    return data.data[0];
  } catch (error) {
    console.error("Error getting user id by name in Supabase:");
    throw error;
  }
},
getUserIdByName: async function (name) {
  try {
    const { data, error } = await supabase
      .from("User")
      .select("user_id")
      .eq("name", name)
    // console.log(data);

    return data[0];
  } catch (error) {
    console.error("Error getting user id by name in Supabase:");
    throw error;
  }
}
};