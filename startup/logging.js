require('express-async-errors')    //for handling async errors of route handler
const winston = require('winston')
require('winston-mongodb')

module.exports = function(){
    process.on('uncaughtException', (ex) => {
        console.log("WE GOT AN UNCAUGHT EXCEPTION")
        console.log(ex.message)
        winston.error(ex.message, ex)
    });
    
    winston.handleExceptions(new winston.transports.File({filename: 'uncaughtException.log'}))

    process.on('unhandledRejection',(ex)=>{
        console.log("we got an un UnhandeledRejection")
        winston.error(ex.message,ex)
    })
    // ***************************** or ****************************  for promise rejection

    // process.on('unhandledRejection',(ex)=>{
    //     throw (ex);
    // })
    
    winston.add(new winston.transports.File({ filename: 'logfile.log','timestamp':true }));
    winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/vidly'}));  // { level: 'error'}
    
    // throw new Error("something wents wrong while starting")        // for testing error handling
    // const p = Promise.reject(new Error('Something failed miserable!'));  // for testing handling promise rejection
    // p.then(()=>{console.log("Done")})
    
}