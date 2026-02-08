const express = require("express");
const bodyParser=require("body-parser");
const app = express();

app.use((req, res, next) => {
  console.log("first dummy middleware", req.url);
  next();
});

app.use((req, res, next) => {
  console.log("second dummy middleware", req.method);
  next();
});

// app.use((req,res,next)=>{
//   console.log("third middleware")
//   res.send("<h1>welcome to complete coding</h1>")
// })

app.get("/", (req, res, next) => {
  console.log("handling / for GET");
  res.send(`<h1>welcome to complete coding</h1>`);
});

app.get("/contact-us", (req, res, next) => {
  console.log("handling /contact-us for GET");
  res.send(`<h1>please give your details here</h1>
    <form action="/contact-us" method="POST">
<input type="text" name="name" placeholder="Enter your name
"/>
<input type="email" name="email" placeholder="Enter your email
" />
<input type="Submit"/>
    </form>
    `);
});

app.post("/contact-us", (req,res,next)=>{
  console.log("handling  /contact-us for post ", req.url , req.method, req.body)
  next();
})

app.use(bodyParser.urlencoded());

app.post("/contact-us", (req,res,next)=>{
  console.log("handling  /contact-us for post ", req.url , req.method, req.body)
  res.send(`<h1>we will contact you shortly</h1>`)
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on address
     http://localhost:${PORT}`);
});
