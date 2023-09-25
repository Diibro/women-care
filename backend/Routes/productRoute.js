const connection = require('./connect')();
const express = require('express');
const multer = require('multer');
const {v4: uuid} = require('uuid');
const path = require('path');

const DIR = './Assets/products';

var productId = "";
var imageName = "";
const dirName = "/Assets/products/";

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, DIR);
     },
     filename: (req, file, cb) => {
          productId = uuid();
          imageName = `${productId}-Logo${path.extname(file.originalname)}`;
          cb(null, imageName);
     }
});

const upload = multer({
     storage:storage
});

const productRoute = express.Router();

productRoute.get('/get-products', (req, res) => {
     const sqlQuery = 'SELECT id, name, price, image, description FROM products';
     connection.query(sqlQuery, (err, data) => {
          if(!data || err) {
               res.status(500).json({message: "Error fetching products"});
          }else{
               res.status(201).json(data);
          }
     });

});

productRoute.post('/add-product', upload.single('image'), (req, res) => {
     const inputQuery = 'insert into products values (?, ?, ?, ?, ?)';
     const url = req.protocol + '://' + req.get('host');

     const imageUrl = `${url}${dirName}${imageName}`;
     const Values = [productId, req.body.name, req.body.price,imageUrl ,req.body.description ]
     connection.query(inputQuery, Values, (error) => {
          if(error) {
               res.status(500).json({message: "Error adding the product. Try again later."});
          }else{
               res.status(201).json({message: "Added the product successfully"});
          }
     } );
});



module.exports = productRoute;
