var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'); //parses information from POST

var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
  orderId: String,
  userSeats: String,
  assignId: String
});

var Book = mongoose.model('Book', bookSchema, 'booking');


router.get('/getBooking', function (req, res) {
    Book.find({}, function (err, docs) {
         res.json(docs);
    });
});

router.get('/getBooking/:id', function (req, res) {
     Book.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
    });
});

router.post('/addBooking', function(req, res){
  var booking = new Book({
    orderId: req.body.OId,
    userSeats: req.body.USeats,
    assignId: req.body.AId
  });

  booking.save(function(err, docs){
    if ( err ) throw err;
    res.json(docs);
  });
});

router.delete('/deleteBooking/:id', function(req, res){
      Book.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateBooking/:id', function(req, res){
    Book.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
