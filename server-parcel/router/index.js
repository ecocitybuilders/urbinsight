// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('*', function(req, res, next) {
//   res.render('index', { title: 'urbinsight' });
// });

// module.exports = router;
 /**
  * The Index of Routes
  */

module.exports = function (app) {
  // Lots Route
  app.use('/data/city/lots', require('./routes/lots.js'));
}
