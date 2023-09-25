const express = require('express');
const cors = require('cors');
require('dotenv').config();
const  patientRoute = require('./Routes/patientRoute');
const  doctorRoute = require('./Routes/doctorRoute');
const adminRoute = require('./Routes/adminRoute');
const  productRoute = require('./Routes/productRoute');
const loginRoute = require('./Routes/loginRoute');
const {chatbotRoute, questionsRoute} = require('./Routes/chatBotRoute');
const { spawn } = require('child_process');
const fs = require('fs');

const connection = require('./Routes/connect')();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/Assets', express.static('./Assets') )

connection.connect((error) => {
     if(error) {
          console.log(error);
     }else{
          console.log("The database is connected.... Happpy happy!!!");
          
     }
});

const server = app.listen(4000, () => {
     console.log("The server is running on port 4000...")
});

// fs.watch('example.txt', (eventType, filename) => {
//      if (eventType === 'change') {
//        console.log('example.txt has changed. Restarting server...');
//        // Implement server restart logic here
       
//        server.close((err) => {
//           if(err){
//                console.error(err);
//           }
//           console.log('Server closed. Restarting...');
          
//           // Spawn a new instance of the startup script
//           const restartServerProcess = spawn('node', ['start.js']); // Replace 'start.js' with the actual script name
//           restartServerProcess.on('exit', (code) => {
//             console.log(`Server restart process exited with code ${code}`);
            
//           });
//         });
//      }
//    });



app.use('/api/patients', patientRoute);
app.use('/api/doctors', doctorRoute);
app.use('/api/admin', adminRoute);
app.use('/api/products', productRoute);
app.use('/api/login', loginRoute);
app.use('/api/chat', chatbotRoute);
app.use('/api/questions', questionsRoute);




module.exports = { server, app };

