const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const config = require('../utils/config')

userRouter.get('/', async (req,res,next) => {
    try{
        const users = await User.find({});
        res.status(200).json(users.map(u => u.toJSON()));
    }catch(e){
        next(e)
    }
});

userRouter.post('/', async (req,res,next) => {
    try{
        if(req.body.password.length < 3){
            return res.status(400).send({error: 'password has to atleast three characters long'})
        }
        const passwordHash = await bcrypt.hash(req.body.password,Number(config.SALTROUNDS));
        const newUser = new User({
        username: req.body.username,
        password: passwordHash,
        name: req.body.name,
    });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    }catch(e){
        next(e);
    }
});
module.exports = {
    userRouter,
}