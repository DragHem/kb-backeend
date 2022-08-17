require("dotenv").config();

const User = require("./model/user.model");

const path = require("path");

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const csrf = require("csurf");
const { limiter } = require("./utils/rateLimiter");

const { productRouter } = require("./routes/product");
const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/user");
const { reviewRouter } = require("./routes/review");
const { wishlistRouter } = require("./routes/wishList");

const app = express();

//MongoDB Connect
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.info("Mongoose Is Connected");
  }
);

//Middleware
app.use(express.static("public/"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: "http://chemiapolska.local:3000",
    // credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // domain: "localhost:3000",
      // sameSite: false,
      httpOnly: false,
      // secure: true,
    },
  })
);
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
require("./passport-config")(passport);

//Routes
app.use("/", authRouter);
// app.use(
//   csrf({
//     cookie: {
//       key: "_csrf",
//       path: "/",
//       httpOnly: true,
//       maxAge: 3600, // 1-hour
//     },
//   })
// );
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/review", reviewRouter);
app.use("/wishlist", wishlistRouter);

//Upload Image
app.post("/image", (req, res) => {});

app.listen(process.env.PORT, process.env.HOST, () =>
  console.info(
    `Express listening on http://${process.env.HOST}:${process.env.PORT}`
  )
);
