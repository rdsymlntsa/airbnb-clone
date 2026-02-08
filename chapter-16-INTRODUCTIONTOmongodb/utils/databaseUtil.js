const mongo=require('mongodb');
const MongoClient=mongo.MongoClient;
const MONGO_URL="mongodb+srv://root:nadijaba99999@rl99999.zanoxwn.mongodb.net/?appName=rl99999";
let _db;
const mongoConnect=(callback)=>{
MongoClient.connect(MONGO_URL).then(client => {
  _db=client.db("airbnb");
  callback(client);
}).catch(err =>{
  console.log("Error while connecting to mongodb", err);
});
};
const getDB=()=>{
  if(!_db){
    throw new Error("Mongo not connected");
  }
  return _db;
}

exports.mongoConnect=mongoConnect;
exports.getDB=getDB;