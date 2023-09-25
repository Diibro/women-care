const connection = require('./connect')();
const express = require('express');

const loginRoute = express.Router();

loginRoute.post('/get-in', async (req, res) => {
     const searchQuery = 'select id, email, password, type from login where email = ?';
     try {
          connection.query(searchQuery, [req.body.email], (err, data) =>{
               if(err){
                    console.log(err);
                    res.status(500).json({message: "Server error"});
               }else{
                    if(!data[0]){
                         res.status(401).json({message: "Invalid email or password", pass: false});
                    }else{
                         if(req.body.password != data[0].password){
                              res.status(400).json({message: 'Wrong password', pass: false});
                         }else{
                              res.status(201).json({message: "Login successfull", pass: true, type: data[0].type, email: data[0].email });
                         }
                    }
               }
          })
     } catch (error) {
          console.log(error)
     }
});

module.exports = loginRoute