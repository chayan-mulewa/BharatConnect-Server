const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection failed:', error);
  }
};

module.exports = connectDB;
