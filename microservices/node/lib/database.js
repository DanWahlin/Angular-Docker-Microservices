// Module dependencies
const mongoose = require('mongoose'),
      dbConfig = require('./configLoader').databaseConfig,
      connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database;
      
let   connection = null;

class Database {

    open(callback) {
        const options = {};
        mongoose.connect(connectionString, options, (err) => {
            if (err) {
                console.log('mongoose.connect() failed: ' + err);
            }
        });
        connection = mongoose.connection;
        mongoose.Promise = global.Promise;

        mongoose.connection.on('error', (err) => {
            console.log('Error connecting to MongoDB: ' + err);
            callback(err, false);
        });
        
        mongoose.connection.once('open', () => {
            console.log('We have connected to mongodb');
            callback(null, true);
        });

    }

    // disconnect from database
    close() {
        connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    }

}

module.exports = new Database();
