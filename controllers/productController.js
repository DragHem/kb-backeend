const Product = require("../model/product");

const getOne = (id) => {
  return Product.findOne({ _id: id });
};

const getAll = () => {
  return Product.find();
};

const createe = (body) => {
  const { name, price, count, desc, image_url, category } = body;

  Product.create({
    name,
    price,
    count,
    desc,
    image_url,
    category,
  });
};

const update = async (id, body) => {
  const { name, price, count, desc, image_url, category } = body;

  const product = await Product.findOne({ _id: id });

  product.name = name ? name : product.name;
  product.price = price ? price : product.price;
  product.count = count ? count : product.count;
  product.desc = desc ? desc : product.desc;
  product.image_url = image_url ? image_url : product.image_url;
  product.category = category ? category : product.category;

  await product.save();
};

const del = async (id) => {
  const product = await Product.findOne({ _id: id });

  await Product.deleteOne({ _id: product._id });
};

module.exports = {
  getOne,
  getAll,
  createe,
  update,
  del,
};
