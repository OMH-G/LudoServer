const jwt=require('jsonwebtoken')
require('dotenv').config()

let token='eyJhbGciOiJSUzI1NiIsImtpZCI6Imluc18yVjNwcjhHVkxycG1SMDZ5OUJEVE1QR2V5REIiLCJ0eXAiOiJKV1QifQ.eyJhcHBfbWV0YWRhdGEiOnt9LCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiYXpwIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiZW1haWwiOm51bGwsImV4cCI6MTY5NzE0MTM1NiwiaWF0IjoxNjk3MTM3NzU2LCJpc3MiOiJodHRwczovL3N0aXJyZWQtYmlyZC04My5jbGVyay5hY2NvdW50cy5kZXYiLCJqdGkiOiI1MzMwZDc4Y2JiMzQzY2QyMzMyMSIsIm5iZiI6MTY5NzEzNzc1MSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJzdWIiOiJ1c2VyXzJXR2FNZzVOWG9RUHpJUklkUUc1WkVCbjVNaCIsInVzZXJfbWV0YWRhdGEiOnt9LCJ1c2VyaWQiOiJ1c2VyXzJXR2FNZzVOWG9RUHpJUklkUUc1WkVCbjVNaCIsInVzZXJuYW1lIjoib21jYXIifQ.f9PsJoY8VgTQ9RhOLXmnKWDGtPkjgc9oCeivVwEiEtt9lN1SSZnN_-L9HEM1lvXkndlHTG4Yb0pXxjmUHe4o6w3MFD0jaXquIEgxWqhQav5PGe5aSFwUTo8jSOzdRaIuhLP4cmTYM5xC9NqmuxVT9b_WQFCBV3LmPsHRjlQ3UWwbp0PY4FlRv3OsD9nmvoblgUZm5sb-dEKaqsbLAPiojZORbO1elWeyqjtSgMb75J5bfkJTYBUOY8tJPr9upcpBBUNUuwIv61TsWXitxNyJ6oFubv9rtcnDpb841C368YBQ-7hVOZ2vIfAO_dtXEa3j_mrAEu5lsSc_aQJIM0plRg'
// supabase.
try{
  let data=jwt.verify(token,process.env.CLERK_PEM,{algorithms:['RS256']})
  console.log(data)
}
catch(error){
  console.log(error.message)
}
// // Generate a Supabase JWT token
// async function call() {
//   const supabaseToken = await supabase.auth.generateToken({
//     template: 'newsupabase',
//     claims: {
//       user_id: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Imluc18yVjNwcjhHVkxycG1SMDZ5OUJEVE1QR2V5REIiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE2OTcxMjY2OTYsImlhdCI6MTY5NzEyNjYzNiwiaXNzIjoiaHR0cHM6Ly9zdGlycmVkLWJpcmQtODMuY2xlcmsuYWNjb3VudHMuZGV2IiwibmJmIjoxNjk3MTI2NjI2LCJzaWQiOiJzZXNzXzJXZlVZdGkxamI4UmtPWmZ1RktKNFozYktnMyIsInN1YiI6InVzZXJfMldHYU1nNU5Yb1FQeklSSWRRRzVaRUJuNU1oIn0.VxgTyE5_BcooznOmbY4WQATbaZqYoAPqqEhJe-9aiNB8jADKCLoFurPFGPh5K3BsyvNFGyGcxfY7sScgzVgPEebuUOXNiStwrGEefWbVNai20y6-V96iUKSYj7i7Z35gy476ySv0mdZwugklX26VNMYUimwPFGXC66admubOTDn7Ky3RQ4MOof8z9NydSpb-fWiqa7zYFTQ624AHiDXLiE-gxpiPPWhY2qOc-g6XPILPQQXL0VaiMZ7HtIen5kqFbgKD5HBnsHAh84IUys-o6TkBclq0_xqES83Ot7u27pfSvEdFdz8PgUPBa8n6bPgRcm8D9Q1ym78Q9d8xmrEvVA'
//     }
//   });
//   console.log(supabaseToken)
// }
// call()
// console.log(supabaseToken)