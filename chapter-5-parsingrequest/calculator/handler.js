
const {sumRequestHandler}=require('./sum');
const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <html>
<head><title>practice set</title></head>
<body>
<h1> welcome to calculator </h1>
<a href="/calculator">Go To Calculator</a>
</body>
    </html>
    
    `);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <html>
<head><title>practice set</title></head>
<body>
<h1> Here is the calculator </h1>
<form action="/calculate-result" method="POST">
<input type="text" placeholder="First number" name="first" />
<input type="text" placeholder="Second number" name="second"/>
<input type="submit" value="Sum"/>
</form>
</body>
    </html>
    
    `);
    return res.end();
  }
  else if(req.url.toLowerCase()==='/calculate-result' && req.method
==='POST'){
    return sumRequestHandler(req,res);
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
<head><title>practice set</title></head>
<body>
<h1> 404 page does not exist </h1>
<a href="/">Go To Home</a>
</body>
    </html>
    
    `);
  return res.end();
};

exports.requestHandler = requestHandler;
