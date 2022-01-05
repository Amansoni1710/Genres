const config = require('config')

module.exports  = function(){
    if (!config.get('jwtPrivateKey')){
        console.log('FATAL ERROR : jwtprivatekey is not defined.');
        process.exit(1)
    }
}