const express=require('express');
const path=require('path');
const rootDir=require('../utils/pathUtil');
const pagenotfound=express.Router();

pagenotfound.use((req,res,next)=>{
  res.status(404).sendFile(path.join(rootDir,'views','404.html'))
})


module.exports=pagenotfound;