const winston = require('winston')

module.exports = function (err, req, res,next){
    // winston.error(err.message,err)
    winston.log("error",err.message)

    //  Error     {level}
    //  Warning
    //  info
    //  verbose
    //  debug 
    //  silly
    res.status(500).send("Something failed");

}