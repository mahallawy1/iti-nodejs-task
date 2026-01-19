const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postroute');

const app = express();  

// Middleware to parse JSON body
app.use(express.json());

// Register routes
app.use('/posts', postRoutes);

// Your MongoDB URI
const MONGODB_URI = 'mongodb+srv://abdo:wN4aPxwBtuBdEomS@abdo.wdvxc.mongodb.net/?appName=abdo';

const PORT = 3000;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });