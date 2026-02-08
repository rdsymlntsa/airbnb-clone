console.log("kg coding is the best")
const fs=require('fs');
fs.writeFile("output.txt","writing file",(err)=> {
  if (err) console.log("Error occurred");
  else console.log("File written successfully");
})