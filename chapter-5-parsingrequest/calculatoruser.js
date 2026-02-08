const userRequestHandler=(req,res)=>{
  if(req.url==='/'){
    res.write(`
      <html>
<head>
<title>Home</title>
</head>
<body>
<h1> welcome </h1>
<p>To use calculator click on this link <a>calculator</a> </p>
</body>
      </html>
      
      
      `)
  }
}