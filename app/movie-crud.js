var express = require('express');
var router = express.Router();
bodyParser = require('body-parser');
var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({

  moviTitle: String,
  moviLanguage: String,
  moviGenre: String,
  moviPoster: String,
  moviDirector: String,
  moviActors: String
 });
var Movie = mongoose.model('Movie', movieSchema, 'movie');

//Movie
router.get('/getMovie', function (req, res) {
    Movie.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/getMovie/:id', function (req, res) {
     Movie.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/addMovie', function(req, res){

  var title = req.body.Title;
  var language = req.body.Language;
  var genre = req.body.Genre;
  var poster = req.body.Poster;
  var director = req.body.Director;
  var actors = req.body.Actors;

  var movie = new Movie({

    moviTitle: title,
    moviLanguage: language,
    moviGenre: genre,
    moviPoster: poster,
    moviDirector: director,
    moviActors: actors

  });
  movie.save(function(err, docs){
    if ( err ) throw err;
    res.json(docs);
  });

  })

router.delete('/deleteMovie/:id', function(req, res){
      Movie.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateMovie/:id', function(req, res){
    Movie.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

//Error Handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
