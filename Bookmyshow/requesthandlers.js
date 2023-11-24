 

 import bcrypt from "bcrypt";
 import movieSchema from "./schema/register.schema.js";
//  import movieSchema from "./schema/movie.schema.js";
 
 import jwt from "jsonwebtoken";
 
 const { sign } = jwt;
 
 
 
 
 
 
 export async function register(req,res){
     try {
         let {username,email,password,profile} = req.body;
         if(username.length < 4 && password.length < 4){
             return res.json("Invalid username or password");
         }
         let userExist = await userSchema.findOne({username});
         let hashedpass = await bcrypt.hash(password,10);
         if(userExist){
             return res.status(401).send("User already exists");
         }
         let result = await userSchema.create({username,email, password: hashedpass,profile});
         if(result){
             return res.status(200).send("Registration successful!");
         }
         return res.status(400).send("file could not be uploaded")
         
     } catch (error) {
         console.log(error);
        res.status(500).send("Error");
         
     }
  }

 
  export async function login(req, res){
     try {
         let {username,password} = req.body;
         if(username.length < 4 && password.length < 4){
             return res.json("Invalid username or password");
         }
         let user = await userSchema.findOne({username});
         if(!user){
             return res.status(403).send("Invalid username or password");
         }
         let passCheck = await bcrypt.compare(password, user.password)
         if(passCheck){
             let token = await sign({
                 username: user.username,
                 id:user._id
             },
             process.env.SECRET_KEY,
             {
                 expiresIn:"24h"
             })
             return res.status(200).json({
                 msg:"Login successful",
                 token:token
         })
         }
         return res.status(403).send("inavlid username or password");        
 
         
     } catch (error) {
         console.log(error);
         res.status(500).send("Error");
     }
  }



  export async function register1(req,res){
    try {
        let {title,category,language,description,profile} = req.body;
        // if(username.length < 4 && password.length < 4){
        //     return res.json("Invalid username or password");
        // }
        // let userExist = await userSchema.findOne({username});
        // let hashedpass = await bcrypt.hash(password,10);
        // if(userExist){
        //     return res.status(401).send("User already exists");
        // }
        let result = await movieSchema.create({title,category,language, description,profile});
        if(result){
            return res.status(200).send("Registration successful!");
        }
        return res.status(400).send("file could not be uploaded")
        
    } catch (error) {
        console.log(error);
       res.status(500).send("Error");
        
    }
 }

export async function uploadFile(req,res){
    try {
        let {title, file}=req.body;
        console.log(title,file);
        let result=await movieSchema.create({
            title,
            file
        });
        if(result){
            return res.json("file uploaded")
        }
        return res.status(400).send("file could not be uploaded")
      
        
    } catch (error) {
        console.log(error)
        return res.status(500).send("error")
    }
}
export async function getfile(req,res){
    try {
       
        let data=await movieSchema.find();
        return res.json(data);
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).send("error")
    }
}