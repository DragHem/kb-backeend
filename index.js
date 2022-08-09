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

const { productRouter } = require("./routes/product");

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/static"));

app.use("/product", productRouter);

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(
    `Express listening on http://${process.env.HOST}:${process.env.PORT}`
  )
);
