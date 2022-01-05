const mongoose = require('mongoose')
const winston = require('winston')

module.exports = function(){
    //  mongoodb connection
    mongoose.connect('mongodb://localhost/vidly')
    .then(()=>{winston.info("Connected to db......")})
}