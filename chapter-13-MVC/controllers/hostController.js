const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  //    res.sendFile(path.join(rootDir,'views','addHome.html'))
  res.render("host/addHome", { pageTitle: "Add Home", currentPage: "addHome" });
};
exports.getHostHomes = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "host-homes",
    });
  });
  // console.log(registeredHomes);
  // res.sendFile(path.join(rootDir,'views','home.html'));
};
exports.postAddHome = (req, res, next) => {
  //   console.log("Home registration successful for: ",req.body);
  // console.log("Home registration successful for: ",req.body, req.body.houseName);
  const { houseName, price, location, rating, photoUrl } = req.body;

  const home = new Home(houseName, price, location, rating, photoUrl);
  // const home=new Home(req.body.houseName,
  //   req.body.price,req.body.locating,req.body.rating,
  //   req.body.photoUrl);
  home.save();

  // registeredHomes.push(req.body);
  res.render("host/home-added", {
    pageTitle: "Home added successfully",
    currentPage: "homeAdded",
  });
  // res.sendFile(path.join(rootDir,'views',
  //     'homeAdded.html'))
};
