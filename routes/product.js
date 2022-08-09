const express = require("express");

const productRouter = express.Router();

const Product = require("../model/product");

productRouter
  .get("/", async (req, res) => {
    const products = await Product.find();

    res.json(products);
  })

  .get("/:id", async (req, res) => {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.json("Nie ma");
    }

    res.json(product);
  })

  .post("/", async (req, res) => {
    const { name, price, count, desc, image_url, category } = req.body;

    await Product.create({
      name,
      price,
      count,
      desc,
      image_url,
      category,
    });

    res.status(201).json("Product added.");
  });
//
//   .put("/:id", (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
//
//     db.update(id, req.body);
//     res.render("client/modified", {
//       name,
//       id,
//     });
//   })
//
//   .delete("/:id", (req, res) => {
//     const { id } = req.params;
//
//     db.delete(id);
//     res.render("client/deleted");
//   })
//
//   .get("/form/add", (req, res) => {
//     res.render("client/forms/add");
//   })
//
//   .get("/form/edit/:id", (req, res) => {
//     const { id } = req.params;
//     const client = db.getOne(id);
//
//     if (!client) {
//       throw new NotFoundError();
//     }
//
//     res.render("client/forms/edit", {
//       client,
//     });
//   });

module.exports = {
  productRouter,
};
