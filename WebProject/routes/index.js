var express = require('express');
var router = express.Router();


var home_controller=require('../controllers/homeController');
var chitietsanpham_controller = require('../controllers/chitietsanphamController');


var aoThoiTrang_controller = require('../controllers/aothoitrang');
var quan_controller = require('../controllers/quan');
var dam_controller = require('../controllers/dam');
var giay_controller = require ('../controllers/giay');

router.get('/', home_controller.index);

// GET home page.
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

router.get('/ao-thoi-trang', aoThoiTrang_controller.sanPham_list); // Nó chạy từ đằng đây nè.... catalog.js không ảnh hưởng gì hết
router.get('/quan-', quan_controller.sanPham_list);
router.get('/vay-dam', dam_controller.sanPham_list);
router.get('/giay-',  giay_controller.sanPham_list);

router.get('/about', function (req, res) {
 // res.render('/'. {output:req.params.id});
})

router.get('/chitietsanpham/:id', chitietsanpham_controller.chitietsanpham);



module.exports = router;
