let createClient = require("@supabase/supabase-js");
// Initialize the Supabase client with your Supabase URL and API key
require('dotenv').config()
module.exports = {
  createClient,
  AuthSupabase: function (auth) {
    let supabase = createClient.createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: { headers: { Authorization: auth } },
      }
    )
    return supabase
  }

}