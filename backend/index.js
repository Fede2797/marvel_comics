require('dotenv').config();

const CryptoJS = require("crypto-js");
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const ORDER = 'title'
const LIMIT = '20'

const url = "https://gateway.marvel.com:443/v1/public/comics?orderBy=title&limit=20&ts=1686354417887&apikey=98a9cd15bd6f6676fcaef6341697bdcf&hash=3ed059b91f206b092e77d94149d57956"

let new_url = new URL('https://gateway.marvel.com:443/v1/public/comics')


app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', ( req, res ) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api', async ( req, res ) => {
    // TODO: Agregar page al body de la request y usarlo para construir la URL
    // const page = req.body.page || 0;
    
    const date = new Date();
    const timestamp = date.getTime().toString();
    const string = timestamp + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY;
    const hash = CryptoJS.MD5(string);

    const comics = [];

    const parameters = [
        {orderBy: ORDER},
        {limit: LIMIT},
        {ts: timestamp},
        {apikey: process.env.PUBLIC_KEY},
        {hash},
    ]

    for ( let p of parameters ) {
        const [[key, value]] = Object.entries(p);
        new_url.searchParams.set(key, value)
    }

    try {
        const res = await fetch(new_url)
        const response = await res.json();
        const { results } = response.data;

        results.map( comic => {
            const { id, title, series, images, creators, dates} = comic;
            // console.log({ id, title, series, images, creators, dates });
            const image = images[0].path + '.' + images[0].extension;

            const creators_items =  creators.items;
            const final_creators = [];
            creators_items.map( c => final_creators.push(c.name))

            const release_date = dates.find( d => d.type === "onsaleDate" ).date

            const c = {
                id,
                title,
                series: series.name,
                image,
                creators: final_creators,
                date: release_date,
            }

            console.log(c);
        });
    } catch (error) {
        console.log(error);
    }

    res.send({ "message": "this is a message from the backend" });
});

const date = new Date();

app.listen(port, () => console.log(`Server running on port ${port}`));