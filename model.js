
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const p = path.join(path.dirname(process.mainModule.filename), 'data',  'userdetails.json');

let userlist = [];

const getcontentformFile = () =>
{
      try{
        let  filecontent = fs.readFileSync(p);
        userlist = JSON.parse(filecontent);
      }
      catch(e)
      {
        userlist = []; 
        console.log(e);
      }    
}

module.exports = class user{
  // user(title, name, age){
  //   this.name = name;
  //   this.title = title;
  //   this.age = age;
  // }
  
   static saveuser(title, name, phone, email, password){
         getcontentformFile();

          let hashpassword =  bcrypt.hashSync(password, 10);
         
           let k = Math.floor(Math.random() * 1000) + 1;
          userlist.push({
            id : k,
            title : title,
            name : name,
            phone : phone,
            email : email,
            password : hashpassword
            });
          fs.writeFile(p, JSON.stringify(userlist), (err)=>{
                console.log(err);
          });
       
   }

   static getalluser()
   {
     getcontentformFile();  
     return userlist;
   }

   
   
    static getuserbyid(userid)
   {
     getcontentformFile()   
     let i = Number(userid);
     const user = userlist.find(({id}) => id ===  i);
     return user;
   }

   static Login(emailval, passwordval)
   {
      //console.log(emailval +' '+ passwordval);
     getcontentformFile();      
     const user = userlist.find(({email}) => email === emailval);
     let message = {};
      if(user != undefined)
      {
        let res = bcrypt.compareSync(passwordval, user.password);
            console.log(res);
            if(res === true)
            {
                var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
                user.token = token;
                message = user;
            }
            else
            {
                message = {message :'invalid password'};
            }
         

          return message;
      }
      else{
          return {message : 'invalid email'};
      }

   }

}