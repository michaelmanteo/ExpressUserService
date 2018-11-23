const mongoose = require('mongoose');
const config = require('./index');

module.exports = {
    connect: (done) => {
        // Configure Mongoose promise & Connect to MongoDB
        mongoose.Promise = global.Promise;
        mongoose.connect(config.database, { useNewUrlParser: true}, done);
    },
    disconnect: (done) => {
        // Disconnect from MongoDB
        mongoose.disconnect(done);
    }
}