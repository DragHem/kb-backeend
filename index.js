require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const { productRouter } = require("./routes/product");
const { authRouter } = require("./routes/auth");

const app = express();

//MongoDB Connect
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

//Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `http;//${process.env.HOST}`,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser("secretCode"));
app.use(csrf({ cookie: true }));

app.use(passport.initialize());
app.use(passport.session());
require("./passport-config")(passport);

//Routes
app.use("/", authRouter);
app.use("/product", productRouter);

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(
    `Express listening on http://${process.env.HOST}:${process.env.PORT}`
  )
);
