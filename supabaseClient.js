
const configSupabase = require('./configSupabase');
let ConfigSup = require('./configSupabase')
module.exports = {

  fetchRooms: async function () {
    try {
      let { data, error } = await ConfigSup.supabase.from("Room").select("id,name,owner_name,value");
      return data;
    } catch (error) {
      console.error("Error creating room in Supabase:");
    }
  }
  ,
  assignroomid_user: async function (rid_uid_data = null) {
    try {
      const { data, error } = await ConfigSup.supabase
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
      const { data, error } = await configSupabase.supabase
        .from("User")
        .select("name")
        .eq("roomid", roomid['id']);
      return data;
    } catch (error) {
      console.error("Error fetching room in Supabase");
    }
  },
  deassignroomid_user: async function (userid) {
    try {
      const { data, error } = await configSupabase.supabase
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
      const { data, error } = await configSupabase.supabase
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
    let data = await configSupabase.supabase
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

      let check = await configSupabase.supabase
        .from("Room")
        .select("owned_by")
        .eq("owned_by", userid);
        
      if (check.data.length !== 0) {
        return {data:[]};
      }
      const data = await configSupabase.supabase
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
      const data = await configSupabase.supabase
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
      console.log(history)
      return "Room History Saved";
    } catch (error) {
      throw error;
    }
  },
  getChips: async function (param) {
    // let userId=param
    // console.log(userId)
    try {
      const { data, error } = await configSupabase.supabase
        .from("User")
        .select("chips")
        .eq("user_id", param['userid'])
        .select();
  
      return data[0];
    } catch (error) {
      console.error("Error creating room in Supabase:");
    }
  },
  fetchRoomsById: async function (roomid) {
    let rid=roomid['id']
    try {

      let data= await configSupabase.supabase
        .from("Room")
        .select("id,name,value")
        .eq("id", rid);
      console.log(data);
      return data.data[0].value;
    } catch (error) {
      console.error("error fetching room from Supabase:");
    }
  },
  fetchroomowner: async function (roomid) {
    try {
      const { data, error } = await configSupabase.supabase
        .from("Room")
        .select("*")
        .eq("id", roomid['id']);
      if(data.length!==0){

        return data[0].owner_name;
      }
    } catch (error) {
      console.error("Error Fetching room owner name from Supabase");
    }
  }
};