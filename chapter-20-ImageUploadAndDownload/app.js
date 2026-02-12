const path = require("path");
const DB_PATH="mongodb+srv://root:root@rl99999.zanoxwn.mongodb.net/airbnb?appName=rl99999";
const express = require("express");
const session=require("express-session");
const MongoDBStore=require('connect-mongodb-session')(session);
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter=require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const app = express();
const mongoose=require('mongoose');
const multer=require('multer');

app.set("view engine", "ejs");
app.set("views", "views");
const store=new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});
const randomString=(length)=>{
  const characters="abcdefghijklmnopqrstuvwxyz";
  let result='';
  for(let i=0;i<length;i++){
    result+=characters.charAt(Math.floor(Math.random()*characters.length))
  }
  return result;
}
const storage=multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,"uploads/");
  },
  filename: (req,file,cb)=>{
    cb(null,randomString(10) + '-' + file.originalname);
  }
});
const fileFilter=(req,file,cb)=>{
  if(file.mimetype === "image/jpg" || file.mimetype==="image/png" || file.mimetype==="image/jpeg"){
    return cb(null,true);
  }
  else{
    return cb(null,false);
  }
}
const multerOptions={
  storage,fileFilter
}
app.use(express.urlencoded({ extended: true }));
app.use(multer(multerOptions).single('photo'));
app.use(express.static(path.join(rootDir, "public")));
app.use("/host/uploads",express.static(path.join(rootDir,"uploads/")));
app.use("/uploads",express.static(path.join(rootDir,"uploads/")));
app.use("/homes/uploads",express.static(path.join(rootDir,"uploads/")));

app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: true,
  store: store
}))
// app.use(session({
//   secret: "secret123",
//   resave: false,
//   saveUninitialized: false,
//   store: store,
//   cookie: {
//     maxAge: 1000 * 60 * 60, // 1 hour
//     httpOnly: true,
//     secure: false, // must be false for localhost HTTP
//     sameSite: 'lax' // allows the cookie to be sent on redirect
//   }
// }));

////////////////////////////////////////////////////////////////
app.use((req,res,next)=>{
  req.isLoggedIn=req.session.isLoggedIn;
  //  res.locals.isLoggedIn = req.session.isLoggedIn;
  // res.locals.user = req.session.user;
  // console.log("cookie middleware ",req.get('Cookie'));
  //req.isLoggedIn=req.get('Cookie')?req.get('Cookie').split('=')[1]==='true' : false;
  next();
})
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.user = req.session.user || null;
  next();
});

// app.use((req, res, next) => {
//   console.log("Session in middleware: ", req.session);
//   res.locals.isLoggedIn = req.session.isLoggedIn || false;
//   res.locals.user = req.session.user || null;
//   next();
// });


app.use(authRouter);
app.use(storeRouter);

app.use("/host",(req,res,next)=>{
  if(req.isLoggedIn){
    next();
  }
  else{
    res.redirect("/login");
  }
})
app.use("/host", hostRouter);

app.use(errorsController.pageNotFound);

const PORT = 3000;


mongoose.connect(DB_PATH).then(()=>{
  console.log("Connected to mongodb");
  app.listen(PORT,()=>{
    console.log(`Server running on address http://localhost:${PORT}`);
  })
}).catch(err =>{
  console.log("Error connecting to mongo", err);
})