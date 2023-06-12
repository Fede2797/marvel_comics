require('dotenv').config();
const { dbConnection } = require("./database/config")
const { getComics, getComicById } = require("./controllers/comics");

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

const connectDB = async () => {
    await dbConnection();
}

connectDB();

app.use( express.json() );
app.use( express.static(path.join(__dirname, 'dist')) );

app.get('/', ( req, res ) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api', getComics);

app.get('/api/:id', getComicById);

app.listen(port, () => console.log(`Server running on port ${port}`));