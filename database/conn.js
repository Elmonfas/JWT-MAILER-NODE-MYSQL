const mysql = require('mysql2/promise')
const env = require('dotenv')
env.config({path:'./env/.env'})

const { createPool } = require('mysql2/promise')
try{
const con = createPool({
    host : process.env.host,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database
})
module.exports = con
}
catch(error){
    console.log('Ha habido un error en la conexion SQL :',error)
}