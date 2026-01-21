require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRouter = require('./routers/posts');
const studentRouter = require('./routers/students');
const errorHandler = require('./middlewares/errorHandler');
const userRouter = require('./routers/user');
const app = express();

app.use(express.json());
app.use(cors());
 
app.use('/posts', postRouter);
app.use('/students', studentRouter);
app.use('/users', userRouter);
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