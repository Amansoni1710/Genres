const jwt = require('jsonwebtoken');
const config = require('config')
const _ = require('lodash');
const express = require('express');
const bcrypt = require('bcrypt')
const {User,validateAuth} = require('../models/user');
const router = express.Router();


router.post("/", async (req,res)=>{
    // const {error}
    const {error} = validateAuth(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email:req.body.email})
    // console.log(user)
    if (!user) return res.status(400).send("Invalid User or Password")

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if(!isValidPassword) return res.status(400).send("Invalid Password or email")

    const token = user.generateAuthToken()
    res.send(token)

})
  
module.exports = router;