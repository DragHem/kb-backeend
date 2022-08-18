require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { productRouter } = require('./routes/product');
const { authRouter } = require('./routes/auth');
const { userRouter } = require('./routes/user');
const { reviewRouter } = require('./routes/review');
const { wishlistRouter } = require('./routes/wishlist');
const {discountRouter} = require('./routes/discount');

const app = express();

//MongoDB Connect
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.info('Mongoose Is Connected');
    }
);

//Middleware
app.use('/static', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, domain: 'http://localhost:3000' },
        name: 'kbs',
        rolling: true,
    })
);
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(passport.initialize());
app.use(passport.session());
require('./passport-config')(passport);

//Routes
app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/review', reviewRouter);
app.use('/wishlist', wishlistRouter);
app.use('/codes', discountRouter);

app.listen(process.env.PORT, () =>
    console.info(
        `Express listening on http://${process.env.HOST}:${process.env.PORT}`
    )
);
