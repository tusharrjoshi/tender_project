// Requiring module
const express = require('express');
const cors = require('cors');

// Creating express object
const app = express();
app.use(cors())
// Handling GET request
app.get('/', (req, res) => {
	res.send('A simple Node App is '
		+ 'running on this server')
	res.end()
})

// Port Number
const PORT = process.env.PORT ||5000;

// Server Setup
app.listen(PORT,console.log(
`Server started on port ${PORT}`));

//testapis
app.get('/tender/', (req, res) => {
	res.send({
        valid: true
    })
	res.end()
})

app.get('/tender/isadmin',(req, res) => {
    var val;
    if(req.query.username=='prit' && req.query.password=="Prit@1234"){
        val = true;
    }
    else{val = false}
    res.status(200).send({
        isadmin: val,
        username: req.query.username,
        password: req.query.password
    })
})

app.get('/tender/isuser',(req, res) => {
    var val;
    if(req.query.username=='prit' && req.query.password=="Prit@1234"){
        val = true;
    }
    else{val = false}
    res.status(200).send({
        isuser: val,
        username: req.query.username,
        password: req.query.password

    })
})

app.get('/tender/isvaliduser',(req, res) => {
    var val;
    if(req.query.username!='pritesh' &&req.query.username!='tushar'){
        val = true;
    }
    else{val = false}
    res.status(200).send({
        valid: val,

    })
})

app.get('/tender/isvalidemail',(req, res) => {
    var val;
    if(req.query.email!='prit@gmail.com' ){
        val = true;
    }
    else{val = false}
    res.status(200).send({
        valid: val,

    })
})

app.get('/tender/isvalidphone',(req, res) => {
    var val;
    if(req.query.phone!='7737788388' &&req.query.username!='tushar'){
        val = true;
    }
    else{val = false}
    res.status(200).send({
        valid: val,

    })
})