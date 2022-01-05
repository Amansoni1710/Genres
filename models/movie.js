const Joi = require('@hapi/joi')
// Joi.objectId = require('joi-objectid')(Joi)

const mongoose = require('mongoose')
const {genreSchema} = require('./genre')


const Movie = mongoose.model('Movie',new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 2,
        maxlegth: 200,
    },
    genre:{
        type: genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        min: 0,
        max: 225
    },
    dailyRentalRate:{
        type: Number,
        min: 0,
        max: 225
    }
}));



function validatemovies(movie){
    const schema = Joi.object({
        title : Joi.string().min(3).max(50).required(),
        genreId : Joi.objectId().required(),
        numberInStock : Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()

    });
return schema.validate(movie)
}

module.exports.validatemovies = validatemovies;
module.exports.Movie = Movie;