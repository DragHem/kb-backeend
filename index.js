require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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

//Models
const Product = require("./model/product");
const { productRouter } = require("./routes/product");

app.use(
  cors({
    origin: `${process.env.HOST}:${process.env.PORT}`,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(__dirname + "/static"));

// app.get("/", async (req, res) => {
//   const newProduct = new Product({
//     name: "MacBook Air",
//     price: "7999",
//     count: 100,
//     desc: "Fajny taki szypki",
//     category: ["Laptop"],
//   });
//
//   await newProduct.save();
//
//   console.log(newProduct);
//   res.send("Dodano");
// });

app.use("/product", productRouter);

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(
    `Express listening on http://${process.env.HOST}:${process.env.PORT}`
  )
);
