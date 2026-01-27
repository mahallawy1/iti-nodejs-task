require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRouter = require('./routers/posts');
const studentRouter = require('./routers/students');
const errorHandler = require('./middlewares/errorHandler');
const userRouter = require('./routers/user');
const donationRouter = require('./routers/donation');
const app = express();


const helmet = require("helmet");
const { sanitizeMongoInput } = require("express-v5-mongo-sanitize");
const { xss } = require('express-xss-sanitizer');
const hpp = require('hpp');
require('dotenv').config();

const rateLimiter = require('./middlewares/rateLimiter.js');
app.use(express.json());
 app.set('trust proxy', 1);
app.use(cors()); // to allow the request from the client
app.use(helmet());
app.use(sanitizeMongoInput);
app.use(xss());
app.use(hpp());
app.use(rateLimiter);


app.use('/posts', postRouter);
app.use('/students', studentRouter);
app.use('/users', userRouter);
app.use('/donations', donationRouter);

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(`${MONGO_URI}/${DB_NAME}`)
    .then(() => {
        console.log('✅✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`✅✅ Server is running on Port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('❌❌ Failed to connect to MongoDB');
        console.log(err);
    });