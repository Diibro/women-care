const connection = require('./connect')();
const express = require('express');
const multer = require('multer');
const {v4: uuid} = require('uuid');
const path = require('path');

const DIR = './Assets/services';

var serviceId = "";
var imageName = "";

const dirName = "/Assets/services/";

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, DIR);
     },
     filename: (req, file, cb) => {
          serviceId = uuid();
          imageName = `${serviceId}-Logo${path.extname(file.originalname)}`;
          cb(null, imageName);
     }
});

const upload = multer({
     storage:storage
});

const serviceRoute = express.Router();

serviceRoute.get('/get-services', (req, res) => {
     const sqlQuery = 'SELECT id, title,description, image, publisher FROM resources';
     connection.query(sqlQuery, (err, data) => {
          if(!data || err) {
               res.status(500).json({message: "Error fetching error"});
          }else{
               res.status(201).json(data);
          }
     });

});

serviceRoute.post('/add-service', upload.single('logo'), (req, res) => {
     const inputQuery = 'insert into resources values (?, ?, ?, ?, ?)';
     const url = req.protocol + '://' + req.get('host');

     const imageUrl = `${url}${dirName}${imageName}`;
     const Values = [serviceId, req.body.title, req.body.description, imageUrl, req.body.publisher]
     connection.query(inputQuery, Values, (error) => {
          if(error) {
               res.status(500).json({message: "Error creating your account. Try again later."});
          }else{
               res.status(201).json({message: "added resource successfully successfully"});
          }
     } );
});



module.exports = serviceRoute;
