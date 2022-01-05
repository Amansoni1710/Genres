const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')


const  userSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required:true,
        unique: true,
        minlength: 3,
        maxlength: 50
    },
    password:{
        type: String,
        required: true,
        minlength: 3,
        maxlength:1024
    },
    isAdmin:{
        type: Boolean,
        // roles:[],
        // operations:[]
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, isAdmin: this.isAdmin}, config.get("jwtPrivateKey"))
    // const token = jwt.sign({_id:user._id}, config.get('jwtPrivateKey'))
    return token
}

const User = mongoose.model('User',userSchema);

function validateUser(user){
    const Schema = Joi.object({
        name: Joi.string().min(3).max(50).required(true),
        email: Joi.string().min(3).max(50).required().email(),
        password: Joi.string().min(3).max(1024).required(),
        isAdmin: Joi.boolean(),
    });
    // return Joi.validate(user,Schema)
    return Schema.validate(user);
}

function validateAuth(auth){
    const Schema = Joi.object({
        email: Joi.string().min(3).max(50).required(true).email(),
        password: Joi.string().min(3).max(1024).required(true),
    })
    return Schema.validate(auth)
}

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.validateAuth = validateAuth;

