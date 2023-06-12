const formatData = ( comic ) => {
    const { id, title, series, images, creators, dates} = comic;
    const image = images[0].path + '.' + images[0].extension;

    const creators_items =  creators.items;
    const final_creators = [];
    creators_items.map( c => final_creators.push(c.name))

    const release_date = dates.find( d => d.type === "onsaleDate" ).date

    return {
        id,
        title,
        series: series.name,
        image,
        creators: final_creators,
        date: release_date,
    }
}

module.exports = {
    formatData,
}