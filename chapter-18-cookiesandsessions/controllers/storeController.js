const Home = require("../models/home");
const Favourite = require("../models/favourite");
exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    isLoggedIn: req.isLoggedIn
    });
  });
};
exports.getIndex = (req, res, next) => {
  console.log(req.session,req.session.isLoggedIn);
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    isLoggedIn: req.isLoggedIn
    });
  });
};
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn
  });
};
exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
  .populate('houseId').then(favourites => {
    const favouriteHomes=favourites.map(fav => fav.houseId);
     res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
    isLoggedIn: req.isLoggedIn
      });
  })
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({ houseId: homeId })
    .then((fav) => {
      if (fav) {
        console.log("Already marked as favourite");
        return;
      } else {
        fav = new Favourite({ houseId: homeId });
        return fav.save();
      }
    })
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log("Error while adding to favourite ", err);
      res.redirect("/favourites");
    });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({houseId: homeId})
    .then((result) => {
      console.log("Deleted ", result);
    })
    .catch((err) => {
      console.log("Error while removing from favourites ", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  // console.log("At details home page ",homeId);
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      console.log(home);
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
    isLoggedIn: req.isLoggedIn
      });
    }
  });
};
