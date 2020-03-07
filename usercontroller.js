
const user = require('./model');
const bcrypt = require('bcryptjs');


exports.getalluser = (req, res)=>{
 let userlist = user.getalluser();
  res.status(200).json(userlist);
}

exports.getuserbyid = (req, res)=>{
   let {userid} = req.params;
  let userdetails = user.getuserbyid(userid);
  
  if(userdetails === undefined)
  {
    res.status(400).json({message : 'record not found'});
  }
  res.status(200).json(userdetails);
}


exports.adduser = (req, res)=>{
  var {title, name, phone, email, password} = req.body;
  try{
  user.saveuser(title, name, phone, email, password);
  res.status(200).send({message:'success', issuccess:'true'});
  }
  catch(e){
    console.log(e);
    res.status(500).send({message:'fail', issuccess:'false'});
  }
}

exports.login = (req, res) => {
  var {email, password} = req.body;
  let result = user.Login(email, password);
   console.log(result);
 if(result.message === 'invalid email')
     {
       res.status(401).send({message : 'Authorisation faild, invalid email'});
     }
     else if(result.message === 'invalid password')
     {
       res.status(401).send({message : 'Authorisation faild, invalid password'});
     }else{
        
        res.status(200).send(result);
     }
 
}