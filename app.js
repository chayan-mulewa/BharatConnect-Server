// app.js
const express = require('express')
const cors = require('cors');
const { authRoutes, usersRoutes } = require('./routes/index');
const { connectDB, Database } = require('./config/index');

const app = express();

connectDB(Database.url);

// Middleware

app.use(
    cors({
        origin: ['https://bharat-connect-client.vercel.app', 'http://localhost:5173'],
        credentials: true
    })
);

app.use(express.json());

// Routes
app.use('/BharatConnect/auth', authRoutes);
app.use('/BharatConnect/users', usersRoutes);

module.exports = app;
