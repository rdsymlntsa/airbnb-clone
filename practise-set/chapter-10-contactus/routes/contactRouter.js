
const express=require('express');
const path=require('path');
const contactRouter=express.Router();
const rootDir=require('../utils/pathUtil');


contactRouter.get("/contact-us", (req, res, next) => {
  console.log("handling /contact-us for GET");
  res.sendFile(path.join(rootDir,'views','addContact.html'));
});

contactRouter.post("/contact-us", (req,res,next)=>{
  console.log("handling  /contact-us for post ")
  console.log(req.body);
  res.sendFile(path.join(rootDir,'views','contactAdded.html'));
})

module.exports=contactRouter;