const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')
const { flightRouter } = require('./routes/flights')
const { userRouter } = require('./routes/users');

let db;

const app = express()

app.use((req, res, next) => {
    req.db = db;
    next()
})
app.use(express.json());
app.use('/api/flights', flightRouter);
app.use('/api/users', userRouter);
app.use((req, res, next) => {
    req.db = db;
    next();
});

connectToDb((err) => {
    if(!err){
        db = getDb()
        app.listen(3000, () => {
            console.log('listening on port 3000')
        })

    }
    else{
        console.log("Failed connecting to database")
    }
    
})

app.get('/', (req, res) => {
        res.json({mssg: 'Server is running'})
    })
    
    
    