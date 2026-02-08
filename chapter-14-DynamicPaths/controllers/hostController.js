const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  //    res.sendFile(path.join(rootDir,'views','addHome.html'))
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "addHome",
    editing: false
  });
};

exports.getEditHome = (req, res, next) => {
  //    res.sendFile(path.join(rootDir,'views','addHome.html'))
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your home",
      currentPage: "host-homes",
      editing: editing,
    });
  });
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
  // res.render("host/home-added", {
  //   pageTitle: "Home added successfully",
  //   currentPage: "homeAdded",
  // });
  // res.sendFile(path.join(rootDir,'views',
  //     'homeAdded.html'))
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id,houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id=id;
  home.save();
  res.redirect("/host/host-home-list");
};


exports.postDeleteHome = (req, res, next) => {
const homeId=req.params.homeId;
console.log(homeId);
  Home.deleteById(homeId,error => {
    if(error){
      console.log("Error while deleting ",error);
    }
    res.redirect("/host/host-home-list");
  })
};

