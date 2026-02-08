const http=require('http');
const server=http.createServer();
const PORT=3001;
server.listen(PORT,()=>{
 console.log(`server running on http://localhost:${PORT}`);
})