const Joi = require('@hapi/joi')
// Joi.objectId = require('joi-objectid')(Joi)   // for valid_id checking
// const dotenv = require('dotenv');
// dotenv.config();
const express = require('express');
const app = express()


require('./startup/routes')(app)
require('./startup/dbConnection')()
require('./startup/logging')()
require('./startup/config')()


console.log(`Your port is ${process.env.PORT}`);
port = process.env.PORT || 3000
app.listen(port, () => console.log(`"Activate on post ${port} node.js"`));
console.log(`server started at http://127.0.0.1:${port}`);