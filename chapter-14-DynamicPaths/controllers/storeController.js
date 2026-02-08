const Home = require("../models/home");
const Favourite=require("../models/favourite");
exports.getHomes = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    });
  });
  // console.log(registeredHomes);
  // res.sendFile(path.join(rootDir,'views','home.html'));
};
exports.getIndex = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};
exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites(favourites => {
    Home.fetchAll(registeredHomes => {
      const favouriteHomes=registeredHomes.filter(home => favourites.includes(home.id));
      res.render("store/favourite-list",{
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites"
      })
    })
  })
  // Favourite.getFavourites(favourite => {
  //   const registeredHomes = Home.fetchAll((registeredHomes) => {
  //   const favouriteHomes=favourite.map((id) => registeredHomes.find(home => home.id === id)).filter(home => home);
  //   res.render("store/favourite-list",{
  //     registeredHomes: favouriteHomes,
  //     pageTitle: "My Favourites",
  //     currentPage: "favourites"}
  //   )
  // });
  // })
  // const registeredHomes = Home.fetchAll((registeredHomes) => {
  //   res.render("store/favourite-list", {
  //     registeredHomes: registeredHomes,
  //     pageTitle: "My Favourites",
  //     currentPage: "favourites",
  //   });
  // });
};

exports.postAddToFavourite= (req, res, next) => {
  console.log(" Came to add to favourite ",req.body);
  Favourite.addToFavourite(req.body.id, error =>{
    if(error){
      console.log("Error while marking favourite.", error);
    }
    res.redirect("/favourites");
  })
  };

exports.postRemoveFromFavourite= (req, res, next) => {
  const homeId=req.params.homeId;
  Favourite.deleteById(homeId, error =>{
    if(error) {
      console.log("Error while removing from favourite ",error);
    }
    res.redirect("/favourites");
  })
  };



exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  // console.log("At details home page ",homeId);
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      console.log(home);
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  });
};
