const connection = require('./connect')();
const express = require('express');
const multer = require('multer');
const {v4: uuid} = require('uuid');
const path = require('path');
const axios = require('axios');

const DIR = './Assets/patients';

var patientId = "";
var imageName = "";
const dirName = "/Assets/patients/";

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, DIR);
     },
     filename: (req, file, cb) => {
          patientId = uuid();
          imageName = `${patientId}-Logo${path.extname(file.originalname)}`;
          cb(null, imageName);
     }
});

const upload = multer({
     storage:storage
});

const patientRoute = express.Router();

patientRoute.get('/get-patients', (req, res) => {
     const sqlQuery = 'SELECT id, name, email, image FROM patients';
     connection.query(sqlQuery, (err, data) => {
          if(!data || err) {
               res.status(500).json({message: "Error fetching error"});
          }else{
               res.status(201).json({patients: data});
          }
     });

});

patientRoute.post('/add-patient', upload.single('logo'), async (req, res) => {
     const inputQuery = 'insert into patients values (?, ?, ?, ?, ?)';
     const logQuery = 'insert into login (id,email, password, type) values (?, ?, ?, ?)';
     const url = req.protocol + '://' + req.get('host');

     const imageUrl = `${url}${path.join(dirName,imageName)}`;
     const Values = [patientId, req.body.name, req.body.email, req.body.password, imageUrl];

     connection.query(logQuery, [patientId, req.body.email, req.body.password, req.body.type], (err) => {
          if(err){
               console.log(err);
               res.status(500).json({message: "Error creating the account"})
          }else{
               connection.query(inputQuery, Values, (error) => {
                    if(error) {
                         res.status(500).json({message: "Error creating your account. Try again later."});
                    }else{
                         res.status(201).json({message: "Created you account successfully"});
                    }
               } );
          }
          
     })
     
});

patientRoute.get('/get-profile', async (req, res) => {
     const profileQuery = 'select name, email, image from patients where email = ?';

     connection.query(profileQuery, [req.body.email], (err, data) => {
          if(err){
               console.error(err);
               res.status(500).json({message: "Server error"});
          }else{
               res.status(201).json({user: data[0]});
          }
     })
})


// patientRoute.post('/ask', async (req,res) => {
//      const options = {
//           method: 'POST',
//           url: 'https://chatgpt53.p.rapidapi.com/',
//           headers: {
//             'content-type': 'application/json',
//             'X-RapidAPI-Key': 'a532700b1fmshb6fede973800c12p111acejsne532281d8451',
//             'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
//           },
//           data: {
//             messages: [
//               {
//                 role: 'user',
//                 content: 'Hello'
//               }
//             ],
//             temperature: 1
//           }
//         };

//         try {
//           const response = await axios.request(options);
//           res.status(201).json({answer: response.data});
//      } catch (error) {
//           console.error(error);
//      }
// })

module.exports = patientRoute;
