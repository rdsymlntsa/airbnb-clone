//core modules
// const path=require('path');
//external modules
const express=require('express');
const hostRouter=express.Router();
//loccal modules
const rootDir=require("../utils/pathUtil");
const hostController=require("../controllers/hostController");
hostRouter.get("/add-home",hostController.getAddHome)
hostRouter.post("/add-home",hostController.postAddHome)
hostRouter.get("/host-home-list",hostController.getHostHomes)
// module.exports=hostRouter;
// exports.hostRouter=hostRouter;
module.exports=hostRouter;
