const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const homeDataPath = path.join(rootDir, "data", "homes.json");
const Favourite=require("./favourite");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }
  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        registeredHomes=registeredHomes.map((home) => (home.id === this.id ? this : home));
      } else {
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }

      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File writing concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    // return registeredHomes;
    fs.readFile(homeDataPath, (err, data) => {
      // console.log("File read: ", err, data);
      callback(!err ? JSON.parse(data) : []);
      // if(!err){
      //   callback( JSON.parse(data));
      // }
      // else callback();
    });
  }
  static findById(homeId, callback) {
    this.fetchAll((homes) => {
      const homeFound = homes.find((home) => home.id === homeId);
      callback(homeFound);
    });
  }

static deleteById(homeId, callback) {
    this.fetchAll((homes) => {
      homes=homes.filter(home=> home.id !== homeId);
         fs.writeFile(homeDataPath, JSON.stringify(homes), error => {
          Favourite.deleteById(homeId,callback);
         });
    });
  }

};
