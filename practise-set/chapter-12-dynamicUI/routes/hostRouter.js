//core modules
const path=require('path');

//external modules
const express=require('express');
const hostRouter=express.Router();

//loccal modules
const rootDir=require("../utils/pathUtil");

hostRouter.get("/add-home",(req,res,next)=>{
//    res.sendFile(path.join(rootDir,'views','addHome.html'))
res.render('addHome',{pageTitle: "Add Home", 
  currentPage: 'addHome'
})
})

const registeredHomes=[];


hostRouter.post("/add-home",(req,res,next)=>{
//   console.log("Home registration successful for: ",req.body);
console.log("Home registration successful for: ",req.body, req.body.houseName);
registeredHomes.push(req.body);   
res.render('homeAdded',{pageTitle: 'Home added successfully', currentPage: 'homeAdded'});
// res.sendFile(path.join(rootDir,'views',
//     'homeAdded.html'))
})

// module.exports=hostRouter;
exports.hostRouter=hostRouter;
exports.registeredHomes=registeredHomes;