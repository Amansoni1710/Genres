const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const Rental = mongoose.model('Rental',new mongoose.Schema({
    customer: { 
        type: new mongoose.Schema({
            name:{
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50,
            },
            isGold:{
                type: Boolean,
                default:false
            },  
            phone:{
                type: String,
                required: true,
                minlength: 3,
                maxlength:50
            }}),
        required: true },
    movie: {
        type: new mongoose.Schema({
            title:{
                type: String,
                required: true,
                trim: true,
                minlength: 2,
                maxlegth: 200,
            },
            dailyRentalRate:{
                type: Number,
                min: 0,
                max: 225
            }}),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        dafault: Date.now
    },
    dateReturn: {
        type: Date,
    },
    rentalFee:{
        type: Number,
        min: 0,
    }
}))


function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(rental)
}

module.exports.validateRental = validateRental;
module.exports.Rental = Rental;