let createClient=require("@supabase/supabase-js");
// Initialize the Supabase client with your Supabase URL and API key
require('dotenv').config()

const supabase = createClient.createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
module.exports={

 fetchRooms:async function() {
  try {
    let { data, error } = await supabase.from("Room").select("*");
    return data;
  } catch (error) {
    console.error("Error creating room in Supabase:");
    throw error;
  }
}

};