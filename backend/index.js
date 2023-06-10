require('dotenv').config();

const CryptoJS = require("crypto-js");
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

const url = "https://gateway.marvel.com:443/v1/public/comics?orderBy=title&limit=20&ts=1686354417887&apikey=98a9cd15bd6f6676fcaef6341697bdcf&hash=3ed059b91f206b092e77d94149d57956"


app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', ( req, res ) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api', async ( req, res ) => {
    // const page = req.body.page || 0;
    
    const date = new Date();
    const timestamp = date.getTime().toString();

    const string = timestamp + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY;

    const hash = CryptoJS.MD5(string);

    try {
        const res = await fetch()
    } catch (error) {
        
    }

    res.send({ "message": "this is a message from the backend" });
});

const date = new Date();

app.listen(port, () => console.log(`Server running on port ${port}`));