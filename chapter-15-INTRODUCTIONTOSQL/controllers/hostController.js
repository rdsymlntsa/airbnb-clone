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
  Home.findById(homeId).then(([homes]) => {
    const home=homes[0];
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
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "host-homes",
    });
  });
};
exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl,description } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl,description );
  home.save();
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id,houseName, price, location, rating, photoUrl,description } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl,description ,id);
  home.save().then(()=>{
    res.redirect("/host/host-home-list");
  }).catch(error => {
    console.log(error);
  })
  
};


exports.postDeleteHome = (req, res, next) => {
const homeId=req.params.homeId;
console.log(homeId);
  Home.deleteById(homeId).then(()=>{
    res.redirect("/host/host-home-list");
  }).catch(error => {
     console.log("Error while deleting ",error);
  })
};

