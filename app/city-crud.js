var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'); //parses information from POST

var mongoose = require('mongoose');

var citySchema = mongoose.Schema({

cityName: String
 });
var City = mongoose.model('City', citySchema, 'citi');


router.get('/getCity', function (req, res) {
    City.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/getCity/:id', function (req, res) {
     City.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/addCity', function(req, res){
 var citi = new City({
     cityName : req.body.cities
  });
  citi.save(function(err, docs){
    if ( err ) throw err;
    res.json(docs);
});


 });

router.delete('/deleteCity/:id', function(req, res){
      City.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateCity/:id', function(req, res){
    City.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
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
