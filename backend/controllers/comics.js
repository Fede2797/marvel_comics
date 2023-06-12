const CryptoJS = require("crypto-js");
const { formatData } = require("../helpers/formatData");
const Comic = require("../models/comic");

const ORDER = 'title'
const LIMIT = '20'
let url = new URL('https://gateway.marvel.com:443/v1/public/comics')

const getComics = async ( req, res ) => {
    // TODO: Agregar page al body de la request y usarlo para construir la URL
    const page = req.body?.page || 0;
    const offset = page * Number(LIMIT);

    // Preparation needed to authenticate with marvel's API
    const date = new Date();
    const timestamp = date.getTime().toString();
    const string = timestamp + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY;
    const hash = CryptoJS.MD5(string);

    // Declaration of the parameters of the URL
    const parameters = [
        {offset},
        {orderBy: ORDER},
        {limit: LIMIT},
        {ts: timestamp},
        {apikey: process.env.PUBLIC_KEY},
        {hash},
    ]
    
    // Attach every parameter to the url
    for ( let p of parameters ) {
        const [[key, value]] = Object.entries(p);
        url.searchParams.set(key, value)
    }
    
    const comics = [];

    // Execute the fetch to the Marvel API, format the data and fill the comics array
    try {
        const res = await fetch(url);
        const response = await res.json();
        const { results } = response.data;

        results.map( comic => {
            const { id, title, series, images, creators, dates} = comic;

            let image = '';
            (images.length !== 0) && (image = images[0]?.path + '.' + images[0]?.extension);

            const creators_items =  creators.items;
            const final_creators = [];
            creators_items.map( c => final_creators.push(c.name))

            const release_date = dates.find( d => d.type === "onsaleDate" ).date

            comics.push({
                id,
                title,
                series: series.name,
                image,
                creators: final_creators,
                date: release_date,
            });
        });
    } catch (error) {
        console.log(error);
    }

    res.send(comics);
    
}

module.exports ={
    getComics,
}

const getComicById = async ( req, res ) => {

    const id = req.params.id;
    
    // Preparation needed to authenticate with marvel's API
    const date = new Date();
    const timestamp = date.getTime().toString();
    const string = timestamp + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY;
    const hash = CryptoJS.MD5(string);

    // Declaration of the parameters of the URL
    const parameters = [
        {id},
        {ts: timestamp},
        {apikey: process.env.PUBLIC_KEY},
        {hash},
    ]
    
    // Attach every parameter to the url
    for ( let p of parameters ) {
        const [[key, value]] = Object.entries(p);
        url.searchParams.set(key, value)
    }
    
    const comics = [];

    // Execute the fetch to the Marvel API, format the data and fill the comics array
    try {
        const res = await fetch(url);
        const response = await res.json();
        const { results } = response.data;

        const comic = formatData(results[0]);
        comics.push(comic);

        const { id, title } = comic;
        const c = new Comic({ comic_id: id, title });
        c.save();

    } catch (error) {
        console.log(error);
    }

    res.send(comics);
    
}

module.exports ={
    getComics,
    getComicById,
}