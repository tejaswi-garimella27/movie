var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'); //parses information from POST

var mongoose = require('mongoose');

var theatreSchema = mongoose.Schema({            // i am creating creating schema for theatre
	theatreName: String,
	theatreSeats: Number,
	ticketPrice: Number,
	cityName: String
});

var Theatre = mongoose.model('Theatre',theatreSchema,'theatre');   // i am defining Theatre model here

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
    theatre.save(function(err, docs){       // i am saving the theatre variable by (var) theatre.save
     if ( err ) throw err;
    res.json(docs);
});

});

router.delete('/deleteTheatre/:id', function(req, res){
      Theatre.remove({_id:req.params.id}, function(err, docs){    // i am removing the data from Theatre model
        res.json(docs);
    });
});

router.put('/updateTheatre/:id', function(req, res){
   Theatre.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {      // i am updating the data from the theatre model by finding the required data- findOneAndUpdate
      res.json(data);
    });
});


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
