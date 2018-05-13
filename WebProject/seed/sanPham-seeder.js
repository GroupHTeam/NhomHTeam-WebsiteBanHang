var SanPham = require('../models/sanPham');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/WebProject');

var sanPhams = [
    new SanPham({
        imagePath: '../images/ao1.png',
        tenSanPham: 'Gothic game',
        description: 'Awesome Game!!!',
        gia: 10,
        maSanPham: '00001',
        maLoaiSanPham: '01111',
    }),
    new SanPham({
        imagePath: '../images/ao2.png',
        tenSanPham: 'Gothic game',
        description: 'Awesome Game!!!',
        gia: 15,
        maSanPham: '00002',
        maLoaiSanPham: '01112',
    }),
    new SanPham({
        imagePath: '../images/ao1.png',
        tenSanPham: 'Gothic game',
        description: 'Awesome Game!!!',
        gia: 125,
        maSanPham: '00003',
        maLoaiSanPham: '01113',
    }),
    new SanPham({
        imagePath: '../images/ao2.png',
        tenSanPham: 'Gothic game',
        description: 'Awesome Game!!!',
        gia: 36,
        maSanPham: '00004',
        maLoaiSanPham: '01114',
    }),
    new SanPham({
        imagePath: '../images/ao1.png',
        tenSanPham: 'Gothic game',
        description: 'Awesome Game!!!',
        gia: 25,
        maSanPham: '00004',
        maLoaiSanPham: '01114',
    })
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

