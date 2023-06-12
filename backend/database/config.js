const mongoose = require("mongoose");

const dbConnection = async() => {
    try {
        
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Database online");

    } catch (error) {
        console.log(error);
        throw new Error('An error ocurred when attempting connection with the database');
    }
}


module.exports = {
    dbConnection
}