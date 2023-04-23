// use express node js frame work here

import express from "express";

// import fs from "fs"  // you want send file as a respone you cannot use a this 

import path from "path";

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


// connect to mongodb database

mongoose.connect("mongodb://127.0.0.1:27017",{dbName:'backend'}).then(()=>console.log("Database Connected")).catch((e)=>console.log(e))

// create a Schema for mongodb 
const messageSchema = new mongoose.Schema({
    name:String,
    email:String,
})
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

// create a model

const Messge = mongoose.model("Message",messageSchema)
const User = mongoose.model("User",userSchema)

// create a server  useing express

/* const server = express();

server.listen(5000,()=>{
    console.log("Server is working")
}) */



// create a server and take name is app

const app = express();

const users = []

// express.static(path.join(path.resolve(),"public")) // this is middleware do not use direct you need app.use

// using middlewares
app.use(express.static(path.join(path.resolve(),"public")))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// setting up view engine
app.set("view engine","ejs")

app.get("/getproducts",(req,res)=>{

    // res.send("HI")

    // send a status code
    // res.sendStatus(404)

    // send a data in   json form

   /*  res.json({
        success:true,
        product:[],
    }) */

    // send a json data with status code

    // res.status(400).send("Meri Marzi")

    // send a file
    // const file = fs.readFileSync("./index.html") // you want send file as a respone you cannot use a this 
    // path.resolve() // return a current location ex. D:\programing\webDevlop\backend\backend in one\nodejs

    const pathlocation = path.resolve();
    console.log(path.join(pathlocation,"./index.html"))
    res.sendFile(path.join(pathlocation,"./index.html"))


})

const isAuthenticated= async(req,res,next)=>{
    const {token} = req.cookies;
    if(token){
        const decoded =jwt.verify(token,"shdjskdkklsdjfkj")
        req.user = await User.findById(decoded._id)
        next()
    }else{
        res.redirect("/login")
    }
}

app.get("/",isAuthenticated,(req,res)=>{
    // res.render("index.ejs",{name:"Abhishek"})
    // res.sendFile("index")

    // Login functionality
   /*  const {token} = req.cookies;
    if(token){
        res.render("logout");
    }else{
        res.render("login")
    } */

    console.log(req.user)

   
    res.render("logout",{name:req.user.name})
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/register",async (req,res)=>{

    const {name,email,password}=req.body;

    let user = await User.findOne({email})

    if(user){
        return res.redirect("/login")
    }

    const hashedPassword = await bcrypt.hash(password,10)
     user = await User.create({
        name,
        email,
        password:hashedPassword,
    })

    const token = jwt.sign({_id:user._id},"shdjskdkklsdjfkj");
    console.log(token)
    res.cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+60*1000)
    });
    res.redirect("/")
})
app.get("/logout",(req,res)=>{
    res.cookie("token",null,{
        httpOnly:true,
        expires:new Date(Date.now())
    });
    res.redirect("/")
})

app.get("/success",(req,res)=>{
    res.render("success")
})

app.post("/contact", async(req,res)=>{
    // console.log(req.body)
    // using object to create data
//    const  messgeData = {name:req.body.name,email:req.body.email}

//    await Messge.create(messgeData)


    // await Messge.create({name:req.body.name,email:req.body.email});

    // using destructing
    const {name,email}=req.body;

    // await Messge.create({name:name,email:email});
    
    // if key value pair same
    await Messge.create({name,email});
    // res.render("success")
    res.redirect("/success")
})

app.post("/login", async(req,res)=>{
    const {email,password}=req.body;

    let user = await User.findOne({email})

    if(!user) return res.redirect('/register')
    
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) return res.render("login",{email,message:"Incorrect  password"})

    const token = jwt.sign({_id:user._id},"shdjskdkklsdjfkj");
    console.log(token)
    res.cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+60*1000)
    });
    res.redirect("/")
})

app.listen(5000,()=>{
    console.log("Server is working")
})