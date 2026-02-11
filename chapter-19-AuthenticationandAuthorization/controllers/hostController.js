const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  //    res.sendFile(path.join(rootDir,'views','addHome.html'))
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user
  });
};

exports.getEditHome = (req, res, next) => {
  //    res.sendFile(path.join(rootDir,'views','addHome.html'))
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then(home => {
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
    isLoggedIn: req.isLoggedIn,
    user: req.session.user
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then(registeredHomes=> {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "host-homes",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user
    });
  });
};
exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl,description } = req.body;
  const home = new Home({houseName, price, location, rating, photoUrl,description} );
  home.save().then(()=>{
    console.log("Home saved successfully")
  });
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id,houseName, price, location, rating, photoUrl,description } = req.body;
  Home.findById(id).then(home => {
    home.houseName=houseName,
    home.price=price;
    home.location=location;
    home.rating=rating;
    home.photoUrl=photoUrl;
    home.description=description;
       home.save().then(result => {
    console.log("Home updated ",result);
   }).catch(err => {
    console.log("Errow while updating ",err);
   })
   res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("Error finding home ",err);
  })
};


exports.postDeleteHome = (req, res, next) => {
const homeId=req.params.homeId;
console.log(homeId);
  Home.findByIdAndDelete(homeId).then(()=>{
    res.redirect("/host/host-home-list");
  }).catch(error => {
     console.log("Error while deleting ",error);
  })
};

