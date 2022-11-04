const express = require("express");
const db = require("./db/db");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()
app.use(bodyParser.json());

//confitmation Api
app.get('/',(req,res)=>{
  res.status(200).send("Hello")
})

// Register API

app.post("/register", (req, res) => {
  const { email, password, username, phone } = req.body;
  const user = {
    email,
    password,
    username,
    phone,
  };
  db.query(`SELECT * from users WHERE email=?`, user.email, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      if (result.length !== 0) {
        return res.status(409).send({
          status: "failed",
          msg: "user already exists with this email",
        });
      } else {
        bcrypt.hash(user.password, 8).then((hash) => {
          user.password = hash;
          db.query(`INSERT INTO users SET ?`, user, (err, result) => {
            if (err) {
              return res.status(400).send(err);
            } else {
              db.query(
                `SELECT * from users WHERE email=?`,
                user.email,
                (err, result) => {
                  if (err) {
                    return res.status(400).send(err);
                  } else {
                    return res.status(201).send({
                      userData: user,
                      msg: "User registered Successfully",
                    });
                  }
                }
              );
            }
          });
        });
      }
    }
  });
});

// Register API

app.post('/login',(req,res)=>{
  const {email, password } = req.body
  db.query(`SELECT * from users WHERE email=?`,req.body.email, (err,result)=>{
    if(err){
      return res.status(400).send(err)
    }else{
      if(result.length===0){
        return res.status(409).send({
          status:"failed",
          msg:"Please enter valid email and password."
        })
      }else{
        bcrypt.compare(req.body.password,result[0].password).then(isMatch=>{
          if(isMatch === false){
            return res.status(404).send({
              status:"failed",
              msg:"Please enter valid password."
            })
          }else{
            const token = jwt.sign({id:result[0].user_id.toString()}, process.env.JWT_SECRET)
            return res.status(201).send({
              status:"success",
              msg:"logged in successfull.",
              user: result[0],
              token
            })
          }
        })
      }
    }
  })

})
app.listen(3000, () => {
  console.log("Server is listening");
});
