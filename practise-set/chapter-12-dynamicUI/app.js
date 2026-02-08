//core modules
const path=require('path');

/* 
for tailwindcss to work you removed tailwindcss/cli and used npx for npx tailwindcss -i ./views/input.css -o ./public/output.css --watch 
and used concurrently for windows, you had to install it using command " npm install -D concurrently "
*/
//external module
const express=require('express');

//local module
const userRouter=require('./routes/userRouter');
const {hostRouter}=require('./routes/hostRouter');
const rootDir=require('./utils/pathUtil');

const app=express();

app.set('view engine','ejs');
app.set('views','views');




app.use(express.urlencoded({extended: true}));
app.use(userRouter);
app.use("/host",hostRouter);
app.use(express.static(path.join(rootDir,'public')));
app.use((req,res,next)=>{
  res.status(404).render('404',{pageTitle: 'page not found',
    currentPage: '404'
  });
})


const PORT=3000;
app.listen(PORT,()=>{
  console.log(`server running on address http://localhost:${PORT}`)
})