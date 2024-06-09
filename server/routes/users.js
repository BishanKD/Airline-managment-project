const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {getDb} = require('../db');

const registerUser = async (req,res) => {
    const db = getDb();
    const { email, password} = req.body;
    try{
        const existingUser = await db.collection('users').findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "User already exists."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            email,
            password: hashedPassword
        };
        await db.collection('users').insertOne(newUser);
        res.status(201).json({message: 'User registered successfully!'})
    }
    catch(err){
        res.status(500).json({
            message: 'Error registering user',
            error: err
        });
    }
};

const loginUser = async (req,res) => {
    const db = getDb();
    const {email, password} = req.body;
    try{
        const user = await db.collection('users').findOne({ email });
        if(!user){
            return res.status(400).json({message: 'User not found'});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Incorrect password'});
        }

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch(err){
        res.status(500).json({
            message: 'Error logging in',
            error: err
        })
    }
}

const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

module.exports = {userRouter};