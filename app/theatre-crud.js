const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var theatreSchema = mongoose.Schema({ 
	theatreName: String,
	theatreSeats: Number,
	ticketPrice: Number,
	cityName: String
});

var Theatre = mongoose.model('Theatre',theatreSchema,'theatre');

router.get('/getTheatre', function (req, res) {
    Theatre.find({}, function (err, docs) {
         res.json(docs);
    });
});

router.get('/getTheatre/:id', function (req, res) {
     Theatre.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/addTheatre', function(req, res){
var theatre = new Theatre({               
  theatreName : req.body.TName,
  theatreSeats: req.body.TSeats,
  ticketPrice: req.body.TPrice,
  cityName: req.body.TCity
  });
    theatre.save(function(err, docs){
     if ( err ) throw err;
    res.json(docs);
});

});

router.delete('/deleteTheatre/:id', function(req, res){
      Theatre.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
});

router.put('/updateTheatre/:id', function(req, res){
   Theatre.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
});

//Error Handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
