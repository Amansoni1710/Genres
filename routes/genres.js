const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const winston = require('winston')

// const asyncMiddleware = require('../middleware/async')
const {Genre,validategenre} = require('../models/genre')
const express  = require('express');
const { Err } = require('@hapi/joi/lib/errors');
const router = express.Router();


// router.get("/",asyncMiddleware(async (req,res) => {

//     const Genres = await Genre.find().sort('name')
//     res.send(Genres)    
    
// }))

// router.get("/", async (req,res) => {
//     // winston.error("error")
//     const Genres = await Genre.find().sort('name')
//     res.send(Genres)
// })

router.get("/", async (req,res,next) => {
        // winston.error("error")
        try{
            // throw new Error("Could not get the genre");    // for testing error middle ware
            const Genres = await Genre.find().sort('name')
            res.send(Genres)
        }
        catch(ex) {
            console.log(ex)
            next(ex)
        }
        
})


router.post("/",auth, async(req,res) => { 
    // validate request body against schema
    const {error} = validategenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let genre = new Genre({ 'name': req.body.name });
    genre = await genre.save() 
    res.send(genre)
})

router.get("/:id", async(req,res) => { 
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send(`genre not found by Id: ${req.params.id}`)
    res.send(genre)
})

router.put("/:id",async(req,res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true}) 

    const {error} = validategenre(req.body)
    if(error) res.status(400).send(result.error.details[0].message) 

    if(!genre) return res.status(404).send(`genre Not exist with id: ${req.params.id}`)
    
    res.send(genre)
})

router.delete('/:id',[auth, admin], async (req,res) => {
    // const book = books.find(c => c.id === parseInt(req.params.id));
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send(`Book Not exist with id: ${req.params.id}`)

    // const index = books.indexOf(book)
    // books.splice(index,1)
    res.send(genre)

})



module.exports = router;