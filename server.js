const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config()

const users = [
    {email:"chikku@gmail.com", password:"1244"},
    {email:"kundan@gmail.com", password:"1235"},
    {email:"harshill@gmail.com", password:"9060"}
]

app.get("/",(req,res)=>{
    res.send("server running")
})

app.put("/user",(req,res)=>{
    const {email,password}=req.body
     const user = users.find(u=>u.email===email);
    if(!user){
        return res.status(404).json({ message: "Email not found" });
    }
    user.password = password;
    return res.status(200).send({ message: "Password updated successfully" ,user});
});

app.delete("/delete",(req,res)=>{
    const {email}=req.body;
    const userIndex = users.findIndex(u=>u.email===email);
    if(userIndex===-1){
        return res.status(404).json({message:"Email not found"});
    }
    users.splice(userIndex, 1);
    return res.status(200).send({ message: "User deleted successfully" });

})


app.get('/users',(req,res)=>{
    res.status(200).send(users);
});

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})

