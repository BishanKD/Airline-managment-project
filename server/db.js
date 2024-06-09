const { MongoClient } = require('mongodb')

let dbConnection

const connectToDb = (cb) => {
    return MongoClient.connect('mongodb://localhost:27017/test')
        .then((client) => {
            dbConnection = client.db();
            cb();
        })
        .catch(err => {
            console.log(err);
            cb();
        })
}

const getDb = () => {
    return dbConnection
}

module.exports = {connectToDb, getDb}