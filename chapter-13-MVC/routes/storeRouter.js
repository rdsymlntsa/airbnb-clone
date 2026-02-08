//core modules
// const path=require('path');
//external modules
const express=require('express');
const storeRouter=express.Router();
const storeController=require("../controllers/storeController")
//local modules
// const rootDir=require("../utils/pathUtil");
const {registeredHomes}=require("./hostRouter");
storeRouter.get("/",storeController.getIndex);
storeRouter.get("/bookings",storeController.getBookings);
storeRouter.get("/homes",storeController.getHomes);
storeRouter.get("/favourites",storeController.getFavouriteList);
module.exports=storeRouter;