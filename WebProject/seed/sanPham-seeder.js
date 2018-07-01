var SanPham = require('../models/sanPham');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/WebProject');

var sanPhams = [
    new SanPham({
        imagePath: '../images/ao1.png',
        tenSanPham: 'Ao dep',
        description: 'Danh rieng cho ban gai!!!',
        gia: 125000,
        maSanPham: 'A1001',
        maLoai: 'A', 
    }),
    new SanPham({
        imagePath: '../images/girl3.png',
        tenSanPham: 'Ao ',
        description: 'Danh rieng cho ban gai!!!',
        gia: 115000,
        maSanPham: 'A1002',
        maLoai:'A'
    }),
    new SanPham({
        imagePath: '../images/girl1.png',
        tenSanPham: 'Ao da',
        description: 'Danh rieng cho ban gai!!!',
        gia: 125000,
        maSanPham: 'A1003',
        maLoai:'A'
    }),
    new SanPham({
        imagePath: '../images/girl2.png',
        tenSanPham: 'Ao lung',
        description: 'Danh rieng cho ban gai!!!',
        gia: 360000,
        maSanPham: 'A1004',
        maLoai:'A'
    }),
    new SanPham({
        imagePath: '../images/kid1.png',
        tenSanPham: 'Aó trẻ em',
        description: 'Be gai xinh!!!',
        gia: 251000,
        maSanPham: 'A2001',
        maLoai:'A'
    }),

    new SanPham({
        imagePath: '../images/quan/quan_dai/quan1.jpg',
        tenSanPham: 'Quần thun nữ ',
        description: 'Quần thun nữ Jogger Baggy Thể thao thời trang !!!',
        gia: 25000,
        maSanPham: 'Q1001',
        maLoai:'Q'
    }),

    new SanPham({
        imagePath: '../images/quan/quan_dai/quan2.jpg',
        tenSanPham: 'Quần thun ôm Legging',
        description: 'Quần thun ôm Legging Thời trang Hàn Quốc !!!',
        gia: 215000,
        maSanPham: 'Q1002',
        maLoai:'Q'
    }),

    new SanPham({
        imagePath: '../images/quan/quan_dai/quan3.jpg',
        tenSanPham: 'Quần thun ôm Legging ',
        description: 'Quần thun ôm Legging 3 sọc Thể thao thời trang!!!',
        gia: 250000,
        maSanPham: 'Q1003',
        maLoai:'Q'
    }),

    new SanPham({
        imagePath: '../images/quan/quan_dai/quan4.jpg',
        tenSanPham: 'Quần thun nữ ',
        description: 'Quần thun nữ Jogger Baggy Thể thao thời trang !!!',
        gia: 125000,
        maSanPham: 'Q1004',
        maLoai:'Q'
    }),

    new SanPham({
        imagePath: '../images/quan/quan_dai/quan5.jpg',
        tenSanPham: 'Quần thun lững ',
        description: 'Quần thun nữ Jogger Baggy Thể thao thời trang !!!',
        gia: 250000,
        maSanPham: 'Q3001',
        maLoai:'Q'
    }),

    new SanPham({
        imagePath: '../images/quan/quan_dai/quan6.jpg',
        tenSanPham: 'Quần tây công sở',
        description: 'Quần thun nữ Jogger Baggy Thể thao thời trang !!!',
        gia: 300000,
        maSanPham: 'Q3002',
        maLoai:'Q'
    }),
];
var done=0;
for(var i=0;i<sanPhams.length;i++){
    sanPhams[i].save(function(err,result){
        done++;
        if(done===sanPhams.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

