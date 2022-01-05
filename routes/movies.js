const {Genre} = require('../models/genre')
const {Movie,validatemovies} = require('../models/movie')
const express = require('express')
const router = express.Router();


router.get("/",async (req,res) => {
    const Movies = await Movie.find().sort('title')
    res.send(Movies)
})

router.post("/", async (req,res) => {
    const {error} = validatemovies(req.body)
    if (error) res.status(400).send(error.details[0].message)

    // console.log(req.body)
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genres');

    const movie = new Movie({
    'title': req.body.title,
    'genre': {
        '_id': genre._id,
        'name': genre.name,
    },
    'numberInStock': req.body.numberInStock,
    'dailyRentalRate': req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie)
})

router.get('/:id', async (req,res) => {
    let movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send(`Movie not found by ${req.params.id} this id`)
    res.send(movie)
})

router.put('/:id', async (req,res) =>{
    let movie = await Movie.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    },{new:true});
    if (!movie) return res.status(404).send(`Movie not found by ${req.params.id} this id`)
    res.send(movie)
});

router.delete("/:id", async (req,res) => {
    let movie = await Movie.findByIdAndRemove(req.params.id)
    if (!movie) return res.status(404).send(`Movie not found by ${req.params.id} this id`)
    res.send("deleted")
})

module.exports = router;