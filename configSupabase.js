let createClient = require("@supabase/supabase-js");
// Initialize the Supabase client with your Supabase URL and API key
require('dotenv').config()
module.exports = {
  // AuthSupabase: function (auth) {
     supabase : createClient.createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: { headers: { Authorization: `Bearer ${process.env.SUP_SECRET_KEY}` } },
      }
    )
    // return supabase
  // }

}