const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userModel = require("./models/UserSchema");
const productModel = require("./models/ProductSchema");
const dotenv = require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(cors({origin:"https://priyanshu-food-service.netlify.app" , credentials:true}));

app.use(express.json({ limit: "10mb" })); // take data upto 10mb

/////////////mongodb connection////////////
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected successfully to database");
  })
  .catch((err) => {
    console.log(err);
  });

//////////////////// for user //////////////////////

//////////// api///////


app.post("/signup", function (req, res) {
  const { firstName, email, password, image } = req.body;
  // authentication
  bcrypt.hash(password, 10).then((hash) => {
    userModel
      .findOne({ email: email })
      .then((result) => {
        if (result) {
          res.json({ message: "Email id is already register", alert: false });
        } else {
          userModel.create({
            firstName,
            email,
            image,
            password: hash,
          });
          res.json({ message: "Successfully sign up", alert: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.post("/login", function (req, res) {
  const { email, password } = req.body; // storing only email and password from user input

  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const dataSend = {
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            image: user.image,
          };
          const token = jwt.sign({ email: user.email },process.env.JWT_KEY);
          
          res.cookie("loginToken", token, {
          httpOnly: true,
          maxAge: 3600000 * 5, // This sets the cookie to expire in 5 hours
          secure: true, // Requires HTTPS to send the cookie
          sameSite: 'none', // Allow cross-origin requests
        });
          
          res.json({ message: "Login success", alert: true, data: dataSend});
        } else {
          res.json({ message: "Wrong email or password", alert: false });
        }
      });
    } else {
      res.json({ message: "User is Not Registered", alert: false });
    } 
  });
});

app.post("/loginWithCookies", function (req, res) {
  const { loginToken } = req.body;
  
  jwt.verify(loginToken, process.env.JWT_KEY, (err, jwtDecoded) => {
    
    userModel.findOne({email: jwtDecoded.email}).then((user) => {
      if (user) {
            const dataSend = {
              _id: user._id,
              firstName: user.firstName,
              email: user.email,
              image: user.image,
            };
            res.json({data: dataSend});
          } 
    })
  })
})

///////// logout /////
app.post("/logout",function(req,res){
  const cookieName = req.body.cookieName;
  
  res.clearCookie(cookieName,
  { httpOnly: true,
   secure: true, // Requires HTTPS to send the cookie
  sameSite: 'none', // Allow cross-origin requests
   });
  
  res.json({ message: "Logout successfully", alert: true });
})

app.post("/uploadProduct", async (req, res) => {
  const data = await productModel(req.body);
  const ds = await data.save();
  res.send({ message: "Upload successfully" });
});

////////// get product///////

app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

app.listen(8080, function (req, res) {
  console.log("started");
});
