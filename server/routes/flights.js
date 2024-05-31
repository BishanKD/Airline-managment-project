const express = require('express')
const {ObjectId} = require('mongodb')
const { getDb } = require('../db')

const flightRouter = express.Router()

const db = getDb()

const getAllFlights = (req, res) => {
    db.collection('flights').find().toArray()
        .then(flights => {
            res.status(500).json(flights)
        })
        .catch(err => res.status(404).json({error: err.message}))
}

const getFlightById = (req, res) => {
    db.collection('flights').findOne({_id: ObjectId(req.params.id)})
        .then(flight => {
            if(!flight){
                res.json({error: "Couldn't fetch flight"})
            }
            res.status(500).json(flight)
        })
        .catch(err => {
            res.status(404).json({Mssg: "Couldn't get flight.", error: err.message})
        })
}

const postFlight = (req, res) => {
    db.collection('flights').insertOne(req.body)
        .then(updated => {res.status(201).json(updated.ops[0])})
        .catch(err => {
            res.status(400).json({Mssg: "Couldn't post flight.", error: err.message})
        })
}

const updateFlight = (req, res) => {
    db.collection('flights').findOneAndUpdate(
        {_id: ObjectId(req.params.id)},
        {$set: req.body},
        {returnOriginal:false}
    )
    .then(updated => {
        if(!updated.value){
            res.status(404).json({Mssg: "Flight not found."})
        }
        res.status(201).json(updated.value)
    })
    .catch(err =>{
        res.status(404).json({error: err.message})
    })
}

const deleteFlight = (req, res) => {
    db.collection('flights').deleteOne(
        {_id: ObjectId(req.params.id)}
    )
    .then(deleted => {
        if(deleted.deletedCount ===0){
            res.status(404).json({mssg:"Flight not found."})
        }
        res.status(204).json({mssg: "Successfully deleted."})
    })
}


flightRouter.route('/')
    .get(getAllFlights)
    .post(postFlight)

flightRouter.route('/id/:id')
    .get(getFlightById)
    .put(updateFlight)
    .delete(deleteFlight)

module.exports = {flightRouter}