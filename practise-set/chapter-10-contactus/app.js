const express = require("express");
const app = express();
const homeRouter=require('./routes/homeRouter');
const contactRouter=require('./routes/contactRouter');
const pagenotfound=require('./routes/pagenotfound');
// app.use((req, res, next) => {
//   console.log("first dummy middleware", req.url);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("second dummy middleware", req.method);
//   next();
// });

// app.use((req,res,next)=>{
//   console.log("third middleware")
//   res.send("<h1>welcome to complete coding</h1>")
// })

app.use(homeRouter);
app.use(express.urlencoded());
app.use(contactRouter);
app.use(pagenotfound);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on address
     http://localhost:${PORT}`);
});
