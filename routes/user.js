const express = require('express');

const userRouter = express.Router();

const { checkIsAuth } = require('../utils/checkIsAuth');

const {
    getUser,
    editUserInfo,
    getUserProduct,
    setAvatar,
} = require('../controllers/user.controller');

userRouter
    .get('/', (req, res) => {
        const { user } = req;
        try {
            res.json(getUser(user));
        } catch (e) {
            res.status(404).json(e.message);
        }
    })

    .post('/', checkIsAuth, (req, res) => {
        const { user, body } = req;

        try {
            editUserInfo(user, body);
            res.json('User info saved.');
        } catch (e) {
            res.status(304).json(e);
        }
    })

    .get('/products', checkIsAuth, async (req, res) => {
        const { user } = req;
        try {
            const products = await getUserProduct(user);
            res.json(products);
        } catch (e) {
            res.status(404).json('Products not found');
        }
    })

    .post('/avatar', checkIsAuth, async (req, res) => {
        try {
            await setAvatar(req, res);
            res.json('Avatar updated successfully.');
        } catch (e) {
            res.json(e.message);
        }
    });

module.exports = {
    userRouter,
};
