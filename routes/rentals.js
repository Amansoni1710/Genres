const {Rental, validateRental} = require('../models/rental')
const {Movie} = require('../models/movie')
const {Customer} = require('../models/customer')
const Fawn = require('fawn');
const express = require('express')
const router = express.Router();

Fawn.init("mongodb://localhost/vidly"); 

router.get("/",async (req,res) => {
    const Rentals = await Rental.find().sort('-dateOut')
    res.send(Rentals)
})  

router.post("/", async (req,res) => {

    const {error} = validateRental(req.body)
    if (error) return res.status(400).send(error.details[0].message)
 
    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(400).send("Invalid Customer")

    const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(400).send("Invalid movie")

    let rental = new Rental({   
        'customer': {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        'movie': {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        'dateOut': req.body.dateOut
    })
    try{new Fawn.Task()
        .save("rentals",rental)
        .update("movies",{_id: movie._id},{
            $inc: {numberInStock: -1}
        })
        .run();
    res.send(rental)
    }
    catch(ex){
        res.status(500).send('something failed')
    }
    

})

module.exports = router;

