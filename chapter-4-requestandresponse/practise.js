const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  if(req.url==='/home'){
    res.write('<h1>Welcome to Home</h1>');
    return res.end();
  }
  else if(req.url==='/men'){
    res.write('<h1>Welcome to Men section</h1>');
    return res.end();
  }
  else if(req.url==='/women'){
    res.write('<h1>Welcome to Women section</h1>');
    return res.end();
  }

  else if(req.url==='/kids'){
    res.write('<h1>Welcome to Kids section</h1>');
    return res.end();
  }
  else if(req.url==='/cart'){
    res.write('<h1>Welcome to Cart</h1>');
    return res.end();
  }
  res.write(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Myntra</title>
</head>
<body>
  <nav>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/men">Men</a></li>
      <li><a href="/women">Women</a></li>
      <li><a href="/kids">Kids</a></li>
      <li><a href="/cart">Cart</a></li>
    </ul>
  </nav>
</body>
</html>`
  );
  res.end();
});

server.listen(3001, () => {
  console.log("Server running on address http://localhost:3001");
});
