require("dotenv").config();

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Siema");
});

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(
    `Express listening on http://${process.env.HOST}:${process.env.PORT}`
  )
);
