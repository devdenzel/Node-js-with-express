const express = require('express')

// IMPORT CONTROLLER
const movieController = require('./../Controllers/moviesController')

const router = express.Router()

//HANDLING REQUEST TO GET HIGHEST RATED MOVIES IN DATABASE
router.route('/highest-rated')
    .get(movieController.getHighestRated, movieController.getAllMovies)

// HANDLING ROUTES  TO GET MOVIES STATS
router.route('/movie-stats')
    .get(movieController.getMovieStats)

// HANDLING ROUTES  TO GET MOVIES BY GENRE
  
// HANDLING ROUTES WITH ROUTER OBJECT
router.route('/')
    .get(movieController.getAllMovies)
    .post(movieController.createMovies)

// HANDLING ROUTES PARAMETER TO SPECIFIC IDs WITH ROUTER OBJECT
router.route('/:id')
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie)


module.exports = router;