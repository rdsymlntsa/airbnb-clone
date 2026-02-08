//core modules
const path=require('path');

//external modules
const express=require('express');
const userRouter=express.Router();

//local modules
// const rootDir=require("../utils/pathUtil");
const {registeredHomes}=require("./hostRouter");

userRouter.get("/",(req,res,next)=>{
  console.log(registeredHomes);
  // res.sendFile(path.join(rootDir,'views','home.html'));
  res.render('home',{registeredHomes: registeredHomes,
     pageTitle: 'airbnb Home', currentPage: 'Home'});
});

module.exports=userRouter;