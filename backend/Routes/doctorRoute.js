const connection = require('./connect')();
const express = require('express');
const multer = require('multer');
const {v4: uuid} = require('uuid');
const path = require('path');
const axios = require('axios');

const DIR = './Assets/doctors';


var doctorId = "";
var imageName = "";

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, DIR);
     },
     filename: (req, file, cb) => {
          doctorId = uuid();
          imageName = `${doctorId}-Logo${path.extname(file.originalname)}`;
          cb(null, imageName);
     }
});

const upload = multer({
     storage: storage
});

const doctorRoute = express.Router();

doctorRoute.get('/get-doctors', (req, res) => {
     const sqlQuery = 'SELECT id, name, email, image FROM doctors';
     connection.query(sqlQuery, (err, data) => {
          if(!data || err) {
               res.status(500).json({message: "Error fetching error"});
          }else{
               res.status(201).json({doctors: data});
          }
     });

});

doctorRoute.post('/add-doctor', upload.single('logo'), (req, res) => {
     const inputQuery = 'insert into doctors values (?, ?, ?, ?, ?)';
     const logQuery = 'insert into login (id, email, password, type) values (?, ?, ?, ?)';
     const url = req.protocol + '://' + req.get('host');
     const dirName = "/Assets/doctors/";

     const imageUrl = `${url}${path.join(dirName,imageName)}`;
     const Values = [doctorId, req.body.name, req.body.email, req.body.password, imageUrl]

     connection.query(logQuery, [doctorId, req.body.email, req.body.password, req.body.type], (err) => {
          if(err) throw err
          
     });

     connection.query(inputQuery, Values, (error) => {
          if(error) {
               res.status(500).json({message: "Error creating your account. Try again later."});
          }else{
               res.status(201).json({message: "Created you account successfully"});
          }
     } );

     
     
});


doctorRoute.get('/get-profile', async (req, res) => {
     const profileQuery = 'select name, email, image from doctors where email = ?';

     connection.query(profileQuery, [req.body.email], (err, data) => {
          if(err){
               console.error(err);
               res.status(500).json({message: "Server error"});
          }else{
               res.status(201).json({user: data[0]});
          }
     })
})



module.exports = doctorRoute;
