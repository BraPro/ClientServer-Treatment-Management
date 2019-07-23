const mongoose = require("mongoose");
const path = require('path')
__dirname+="/";
const express = require('express')
const app = express()
const port = 27017;
const http = require('http'); 
const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({extended: true});
var nodemailer=require('nodemailer');


/// connection to mongodb through mongoose///
mongoose.connect("mongodb+srv://wefix:wefix123456@clusterwefix-43jvo.mongodb.net/wefix?retryWrites=true&w=majority",{useNewUrlParser:true});
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
  console.log("connection succeeded"); 
});
/////////////////////////////////////////////



/////////////////load all files////////////////////////////////////////
        app.use('/bootstrap', express.static(path.join(__dirname, 'bootstrap')));
        app.use('/css', express.static(path.join(__dirname, 'css')));
        app.use('/html', express.static(path.join(__dirname, 'html')));
        app.use('/js', express.static(path.join(__dirname, 'js')));
        app.use('/img', express.static(path.join(__dirname, 'img')));
        app.use(express.static('Wefix'));
		app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json());

////////////////get and post requests for web pages//////////////////


   app.get('/favicon.ico',function(req,res){
    res.end();
  });
    app.get("/mainpage", function(req, res) {
            res.sendFile(path.join(__dirname +"html"+ "/mainpage.html"));
  });
    app.post("/mainpage", function(req, res) {
            res.sendFile(path.join(__dirname +"html"+ "/mainpage.html"));
  });
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname +"html"+ "/loginpage.html"));
  });
   app.post("/", (req, res) => {
      res.sendFile(path.join(__dirname +"html"+ "/loginpage.html"));
  });
    app.get("/contactpage", function(req, res) {
      res.sendFile(path.join(__dirname +"html"+ "/contactpage.html"));  
  });
  

  
//****//

//////////register to DB//////////////
app.post('/register',(req,res) => {
	console.log(req.body);
	console.log("email: "+req.body.inputEmail);
	console.log("password: "+req.body.inputPassword);
    db.collection('users').findOne({email:req.body.inputEmail}, function(err, user){     
    if(user ===null){ 
	   console.log(" if true");
	  var data = { 
        "email": req.body.inputEmail, 
        "password":req.body.inputPassword 
       } 
	  db.collection('users').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("User inserted Successfully");
        res.json({ok:'/'});          
    });   
    }  
    else 
    {
	   console.log(" else true");
	   console.log("User already exists");
       res.json({error:'email exists try another one'});
    }
    
});  
});
////////////////////////////////////

////////Login////////////
app.post('/login',(req,res) => {
	  console.log(req.body.inputEmail);
	  console.log(req.body.inputPassword);
	  db.collection('users').findOne({email:req.body.inputEmail}, function(err, user) {
            if(user ===null){
              res.json({error:"Email does not exists please register first."});
			  console.log("Email does not exists please register first.");
           } else if ((user.email === req.body.inputEmail) && (user.password === req.body.inputPassword) ){
            res.json({ok:'/mainpage'});  
         } else {
           console.log("Password Wrong. please try again");
           res.json({error:"Password Wrong. please try again"});
         }
  });
		
});
///////////////////////////////////////////////////////////////////

///////////send email ////////////

app.post('/recpass', urlencodeParser,function(req,res){
          console.log(req.body); 
		  console.log(req.body.conemail); 
          var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "wefixbraudeproject@gmail.com",
              pass : "Wefix123456"
            }
          });  
          db.collection('users').findOne({email: req.body.conemail}, function(err, user) {
            if(user ===null){
              res.json({error:"Email does not exists."});
           }else if (user.email === req.body.conemail ){
            var mailOptions= {
              from: "wefixbraudeproject@gmail.com",
              to:req.body.conemail,
              subject:"Wefix Recover Password Request",
              text:"Thanks for contacting us "+req.body.conemail+"\nYour password is : " +user.password +"\nHave a good day from WeFix Support Team.\n"
            };
            transporter.sendMail(mailOptions,function(error,info){
              if(error) {
                console.log(error);
              }else{
                console.log("Email send: " + info.response);
                res.json({ok:'/'});             
                }
              });
         } else {
           console.log("Something wrong on DB");
           res.json({error:"Login invalid"});
         }
  });
});      
///////////////////////////////////////////////


////The Listener config og the port////

 app.listen(process.env.PORT || 8080, function(){
            console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
          });
//////////////////////////////////////////////