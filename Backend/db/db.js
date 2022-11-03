const mysql = require('mysql')
// console.log("db is called")
require('dotenv').config()

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    insecureAuth : true 
})

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("started db ");
    }
})

module.exports = db 