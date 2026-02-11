const {check,validationResult}=require('express-validator');
const User=require('../models/user');
const bcrypt=require('bcryptjs')
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
    errors: [],
    oldInput: {email: ""}
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: {firstName: "",lastName: "",email: "",userType: ""
    }
  });
};
exports.postSignup = [
  check("firstName")
  .trim()
  .isLength({min: 2})
  .withMessage("First name should be atleast 2 characters long")
  .matches(/^[a-zA-Z\s]+$/)
  .withMessage("First name should contain only alphabets"),
   
  check("lastName")
  .matches(/^[a-zA-Z\s]*$/)
  .withMessage("Last name should contain only alphabets"),

  check("email")
  .isEmail()
  .withMessage("Please enter a valid email")
  .normalizeEmail(),

  check("password")
  .isLength({min: 8})
  .withMessage("Password should be atleast 8 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password should contain atleast one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password should contain atleast one lowercase character")
  .matches(/[0-9]/)
  .withMessage("Password should contain atleast one number")
  .matches(/[!@#$%^&*(),.<>?:"{}|]/)
  .withMessage("Password should contain atleast one special character")
  .trim(),

  check("confirmPassword")
  .trim()
  .custom((value,{req})=>{
    if(value!=req.body.password){
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  check("userType")
  .notEmpty()
  .withMessage("Please select a user type")
  .isIn(['guest','host'])
  .withMessage("Invalid user type"),

  check("terms")
  .notEmpty()
  .withMessage("Please accept the terms and conditions")
  .custom((value,{req})=>{
    if(value!=='on'){
      throw new Error("Please accept the terms and conditions");
    }
    return true;
  })
  ,
  (req, res, next) => {
 const {firstName,lastName,email,password,userType}=req.body;
 const errors=validationResult(req);
if(!errors.isEmpty()){
  return res.status(422).render("auth/signup",{
    pageTitle: "Sign Up",
    currentPage: "signup",
    isLoggedIn: false,
    errors: errors.array().map(err => err.msg),
    oldInput: {
      firstName,lastName,email,userType
    }
  })
}

bcrypt.hash(password,12).then(hashedPassword => {
  const user=new User({firstName,lastName,email,
    password: hashedPassword,userType
  });
  return user.save();
})
.then(()=>{
  res.redirect("/login");
}).catch(err => {
  return res.status(422).render("auth/signup",{
    pageTitle: "Sign Up",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [err.message],
    oldInput: {
      firstName,lastName,email,userType
    }
  })
})

}];

exports.postLogin = async (req, res, next) => {
  const {email,password}=req.body;
  const user=await User.findOne({email});
  if(!user){
    return res.status(422).render("auth/login",{
      pageTitle: "Login",
      isLoggedIn: false,
      currentPage: "login",
      errors: ["User does not exist"],
      oldInput: {email}
    })
  }
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.status(422).render("auth/login",{
      pageTitle: "Login",
      isLoggedIn: false,
      currentPage: "login",
      errors: ["Incorrect password"],
      oldInput: {email}
    })
  }
  req.session.isLoggedIn = true;
  //req.session.user=user;
  req.session.user={
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userType: user.userType
  }
  //await req.session.save();
  req.session.save(err => {
    if(err) console.log("Error while saving session",err);
    res.redirect("/");
  })
  //res.redirect("/");
  //console.log("After logged in: ",req.session,req.session.isLoggedIn);
};

exports.postLogout = (req, res, next) => {
  //res.cookie("isLoggedIn",false);
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
