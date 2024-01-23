const mongoose = require('mongoose');

function initDatabaseConnection (database){
    const mongoDB = `mongodb://127.0.0.1:27017/${database}`;
    mongoose.connect(mongoDB);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open',function(){
        console.log("MongoDB connected");
    });
}

module.exports = initDatabaseConnection;