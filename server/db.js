const { MongoClient } = require('mongodb')

let dbConnection

const connectToDb = () => {
    return MongoClient.connect('mongodb://localhost:27017/test')
        .then((client) => {
            dbConnection = client.db()
        })
        .catch(err => {
            console.log(err)
        })
}

const getDb = () => {
    return dbConnection
}

module.exports = {connectToDb, getDb}