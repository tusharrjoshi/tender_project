const express = require("express");
const db = require("./db/db");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware/auth");
require("dotenv").config();
const cors = require("cors");
app.use(bodyParser.json());
app.use(
  cors({
    // credentials: true,
    origin: true,
  })
);

// Register API

app.post("/register", (req, res) => {
  const { email, password, name, phone } = req.body;
  const user = {
    name,
    email,
    password,
    phone,
  };
  db.query(
    `SELECT * from tenderusers WHERE email=?`,
    user.email,
    (err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        if (result.length !== 0) {
          console.log(result);
          return res.status(409).send({
            status: "failed",
            msg: "user already exists with this email",
          });
        } else {
          bcrypt.hash(user.password, 8).then((hash) => {
            user.password = hash;
            db.query(`INSERT INTO tenderusers SET ?`, user, (err, result) => {
              if (err) {
                return res.status(400).send(err);
              } else {
                db.query(
                  `SELECT * from tenderusers WHERE email=?`,
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
    }
  );
});

// Login API

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body.email)
  // console.log(req.body.password)
  // console.log(email)
  // console.log(password)
  db.query(
    `SELECT * from tenderusers WHERE email=?`,
    req.body.email,
    (err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        if (result.length === 0) {
          return res.status(409).send({
            status: "failed",
            msg: "Please enter valid email and password.",
          });
        } else {
          bcrypt
            .compare(req.body.password, result[0].password)
            .then((isMatch) => {
              if (isMatch === false) {
                return res.status(404).send({
                  status: "failed",
                  msg: "Please enter valid password.",
                });
              } else {
                const token = jwt.sign(
                  {
                    id: result[0].user_id.toString(),
                    email: result[0].email.toString(),
                    isAdmin:result[0].isAdmin
                  },
                  process.env.JWT_SECRET,
                  { expiresIn: "2h" }
                );
                return res.status(201).send({
                  status: true,
                  msg: "logged in successfull.",
                  user: result[0],
                  token,
                });
              }
            });
        }
      }
    }
  );
});
app.listen(3000, () => {
  console.log("Server is listening");
  // bcrypt.hash('123456', 8).then((hash) => {
  //   console.log(hash)
  // })
});

//isvalidemail

app.post("/isvalidemail", (req, res) => {
  const { email, password } = req.body;
  db.query(
    `SELECT * from tenderusers WHERE email=?`,
    req.body.email,
    (err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        if (result.length === 0) {
          return res.status(200).send({
            status: "true",
            msg: "It is a valid email.",
          });
        } else {
          return res.status(409).send({
            status: "false",
            msg: "It is nota valid email.",
          });
        }
      }
    }
  );
});

app.post("/isvalidphone", (req, res) => {
  const { phone } = req.body;
  db.query(
    `SELECT * from tenderusers WHERE phone=?`,
    req.body.phone,
    (err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        if (result.length === 0) {
          return res.status(200).send({
            status: "true",
            msg: "It is a valid phone number.",
          });
        } else {
          return res.status(409).send({
            status: "false",
            msg: "It is nota valid phone number.",
          });
        }
      }
    }
  );
});

app.get("/islogin", middleware.isLoggedIn, (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let decode = jwt.verify(token, process.env.JWT_SECRET);

  res.status(200).send({
    status:true,
    data:decode
  });
});

app.post('/addTendor' ,(req,res)=>{

  let { adminName , tendertitle,openingdate,closingdate,tendertype,supplier,product,userID }= req.body
  console.log(openingdate, closingdate);
  let q = `INSERT INTO tenders (adminName, tenderTitle, openigDate, closingDate, tenderType, supplier, product,userID) VALUES ('${adminName}', '${tendertitle}', '${openingdate}', '${closingdate}', '${tendertype}', '${supplier}', '${product}',${userID})`;
  db.query(q,(err,result)=>{
    if(err){
      res.status(200).send({status:false, data:err})

    }else{
      res.status(401).send({status:true,data:result})
    }
  })
})

app.post('/bidstatusbyid' ,(req,res)=>{

  let {tenderId }= req.body
  console.log(tenderId);
  let q = `UPDATE tenders SET bid = 1 WHERE tenderId = ${tenderId}`;
  db.query(q,(err,result)=>{
    if(err){
      res.status(200).send({status:false, data:err})

    }else{
      res.status(401).send({status:true,data:result})
    }
  })
})


app.post('/getTenders',(req,res)=>{
  let q = `SELECT * FROM tenders WHERE userID = ${req.body.userID}`
  db.query(q,(err,result)=>{
    if(err){
      res.status(400).send({status:false,data:err})
    }else{
      res.status(200).send({status:true,data:result})
    }
  })
})

app.post('/getTendersbyid',(req,res)=>{
  let q = `SELECT * FROM tenders WHERE tenderId = ${req.body.tenderId}`
  db.query(q,(err,result)=>{
    if(err){
      res.status(400).send({status:false,data:err})
    }else{
      res.status(200).send({status:true,data:result})
    }
  })
})

app.get('/getAllTenders',(req,res)=>{
  let q = `SELECT * FROM tenders`
  db.query(q,(err,result)=>{
    if(err){
      res.status(400).send({status:false,data:err})
    }else{
      res.status(200).send({status:true,data:result})
    }
  })
})

app.post('/getbids',(req,res)=>{
  let q = `SELECT * FROM bids WHERE tenderId = ${req.body.tenderId}`
  db.query(q,(err,result)=>{
    if(err){
      res.status(400).send({status:false,data:err})
    }else{
      res.status(200).send({status:true,data:result})
    }
  })
})

app.post('/getbid',(req,res)=>{
  let q = `SELECT * FROM bids WHERE bidId = ${req.body.bidId}`
  db.query(q,(err,result)=>{
    if(err){
      res.status(400).send({status:false,data:err})
    }else{
      res.status(200).send({status:true,data:result})
    }
  })
})

app.post('/bid' ,(req,res)=>{

  let { tenderId , bidname,biddate,bidamount,bidphone,bidgst,bidaccount,biddetails,userId }= req.body
  console.log(req.body)
  let q = `INSERT INTO bids (tenderID,bidname, biddate, bidamount	, bidphone, bidgst, bidaccount	,biddetails,userID) VALUES ('${tenderId}' , '${bidname}','${biddate}','${bidamount}','${bidphone}','${bidgst}','${bidaccount}','${biddetails}',${userId})`;
  db.query(q,(err,result)=>{
    if(err){
      console.log(err)
      res.status(200).send({status:false, data:err})

    }else{
      console.log(44)
      res.status(401).send({status:true,data:result})
    }
  })
})

app.post('/bidapprove' ,(req,res)=>{

  let {bidId }= req.body
  
  let q = `UPDATE bids SET approved = 1 WHERE bidId = ${bidId}`;
  db.query(q,(err,result)=>{
    if(err){
      res.status(200).send({status:false, data:err})

    }else{
      res.status(401).send({status:true,data:result})
    }
  })
})

app.post('/bidunapprove' ,(req,res)=>{

  let {bidId }= req.body
  
  let q = `UPDATE bids SET approved = 0 WHERE bidId = ${bidId}`;
  db.query(q,(err,result)=>{
    if(err){
      res.status(200).send({status:false, data:err})

    }else{
      res.status(401).send({status:true,data:result})
    }
  })
})

app.post('/removetender',(req,res)=>{
  let q = `DELETE FROM tenders WHERE tenderId =  ${req.body.tenderId}`
  db.query(q,(err,result)=>{
    if(err){
      res.status(400).send({status:false,data:err})
    }else{
      res.status(200).send({status:true,data:result})
    }
  })
})



////////////////////////////////////////////////////////temp api
app.get("/", (req, res) => {
  res.send({
    valid: true,
  });
  res.end();
});

app.get('/gettenderlist', (req, res) => {
  var username = req.query.username;
res.send({
      tenderlist: [{tenderid:'D01',tendername:'chair',organization:'cba',uploaddate:'01-01-2020',enddate:'02-02-2020',notify:true},
                  {tenderid:'D02',tendername:'chair',organization:'vyas',uploaddate:'01-01-2020',enddate:'02-02-2020',notify:false},
                  {tenderid:'D01',tendername:'chair',organization:'net',uploaddate:'01-03-2020',enddate:'03-03-2020',notify:true},
                  {tenderid:'D01',tendername:'chair',organization:'cba',uploaddate:'01-01-2020',enddate:'02-02-2020',notify:true},
                  {tenderid:'D02',tendername:'chair',organization:'vyas',uploaddate:'01-01-2020',enddate:'02-02-2020',notify:false},
                  {tenderid:'D01',tendername:'chair',organization:'net',uploaddate:'01-03-2020',enddate:'03-03-2020',notify:true},
                  {tenderid:'D01',tendername:'chair',organization:'cba',uploaddate:'01-01-2020',enddate:'02-02-2020',notify:true},
                  {tenderid:'D02',tendername:'chair',organization:'vyas',uploaddate:'01-01-2020',enddate:'02-02-2020',notify:false},
                  {tenderid:'D01',tendername:'chair',organization:'net',uploaddate:'01-03-2020',enddate:'03-03-2020',notify:true},]
  })
res.end()
})
