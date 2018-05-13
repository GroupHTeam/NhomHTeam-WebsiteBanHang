var express = require('express');
var router = express.Router();
//require Controllers module
//home_controller = require('../controllers/homeController');
/* GET home page. */
//router.get('/',home_controller.index );
// router.get('/', function(req, res, next){
//     sanPham.find(function(err,docs){
//         res.render('frontend/home/index', {title: 'WebProject', sanPhams :docs });
//     });
// });

var home_controller=require('../controllers/homeController');

router.get('/', home_controller.index);


module.exports = router;
