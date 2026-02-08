//core modules
// const http = require("http");


//external module
const express=require('express');


//local module
const requestHandler=require('./user');

const app=express();

app.use("/",(req,res,next)=>{
  console.log("came in first middleware ", 
    req.url, req.method);
  next();
})

app.use("/submit-details",(req,res,next)=>{
  console.log("came in second middleware ", req.url, req.method);
  res.send('<p>welcome to complete coding nodejs series</p>')
})


// const server=http.createServer(requestHandler);
// const server=http.createServer(app);
// const server=http.createServer((req,res)=>{
//   console.log(req);
// })
// const PORT = 3002;
// server.listen(PORT, () => {
//   console.log(`Server running on address http://localhost:${PORT}`);
// }); 

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
}); 