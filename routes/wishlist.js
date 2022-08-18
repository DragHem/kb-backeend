const express = require('express');

const User = require('../model/user.model');
const Product = require('../model/product.model');

const { checkIsAuth } = require('../utils/checkIsAuth');

const wishlistRouter = express.Router();

wishlistRouter
    .get('/', checkIsAuth, async (req, res) => {
        console.log(req.cookies);

        if (!req.user) return res.json('Tak');

        const wishlistItems = await Product.find({
            _id: { $in: req.user.wishlist },
        });

        res.json(wishlistItems);
    })

    .post('/', checkIsAuth, async (req, res) => {
        const { productId } = req.body;
        const { _id } = req.user;

        User.findOne({ _id: _id }, (err, user) => {
            if (err) throw err;
            if (!user) return 'Product not found';

            if (user.wishlist.includes(productId))
                return res.json('Product already is on wishlist.');

            user.wishlist.push(productId);
            user.save();
            res.json('Product added to wishlist.');
        });
    })

    .delete('/:id', checkIsAuth, async (req, res) => {
        const { _id } = req.user;
        const { id: productId } = req.params;

        User.findOne({ _id: _id }, (err, user) => {
            if (err) throw err;
            if (!user) return 'Product not found';

            if (!user.wishlist.includes(productId))
                return res.json('Product not exists on wishlist.');

            user.wishlist.remove(productId);
            user.save();
            res.json('Product removed from wishlist.');
        });
    });

module.exports = {
    wishlistRouter,
};
