const express = require("express");

const productRouter = express.Router();

const {
  getOne,
  getAll,
  create,
  update,
  del,
} = require("../controllers/productController");

productRouter
  .get("/", async (req, res) => {
    const products = await getAll();

    res.json(products);
  })

  .get("/:id", async (req, res) => {
    const { id } = req.params;

    const product = await getOne(id);

    if (!product) {
      return res.json("Nie ma");
    }

    res.json(product);
  })

  .post("/", async (req, res) => {
    await create(req.body);

    await res.status(201).json("Product added.");
  })

  .put("/:id", async (req, res) => {
    const { id } = req.params;

    await update(id, req.body);

    res.end();
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;

    await del(id);

    res.end();
  });

module.exports = {
  productRouter,
};
