const connection = require('./connect')();
const express = require('express');
const multer = require('multer');
const {v4: uuid} = require('uuid');
const path = require('path');
const axios = require('axios');

const DIR = './Assets/admins';

var adminId = "";
var imageName = "";

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, DIR);
     },
     filename: (req, file, cb) => {
          adminId = uuid();
          imageName = `${adminId}-Logo${path.extname(file.originalname)}`;
          cb(null, imageName);
     }
});

const upload = multer({
     storage:storage
});

const adminRoute = express.Router();

adminRoute.get('/get-admins', (req, res) => {
     const sqlQuery = 'SELECT id, name, email, image FROM admins';
     connection.query(sqlQuery, (err, data) => {
          if(!data || err) {
               res.status(500).json({message: "Error fetching error"});
          }else{
               res.status(201).json(data);
          }
     });

});

adminRoute.post('/add-admin', upload.single('logo'), (req, res) => {
     const inputQuery = 'insert into admins values (?, ?, ?, ?, ?)';
     const url = req.protocol + '://' + req.get('host');

     const imageUrl = `${url}${DIR}${imageName}`;
     const Values = [adminId, req.body.name, req.body.email, req.body.password, imageUrl]
     connection.query(inputQuery, Values, (error) => {
          if(error) {
               res.status(500).json({message: "Error creating your account. Try again later."});
          }else{
               res.status(201).json({message: "Created you account successfully"});
          }
     } );
});




module.exports = adminRoute;
