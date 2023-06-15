require('dotenv').config();
const { dbConnection } = require("./database/config")
const { getComics, getComicById } = require("./controllers/comics");

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

// DB Connection
const connectDB = async () => {
    await dbConnection();
}

connectDB();

// Middlewares
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "page");
    next();
  });

app.use( express.json() );

app.use( express.static(path.join(__dirname, 'dist')) );

// Request handlers
app.get('/', ( req, res ) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api', getComics);

app.get('/api/:id', getComicById);

// Allows the server to listen to requests
app.listen(port, () => console.log(`Server running on port ${port}`));