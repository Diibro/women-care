const connection = require('./connect')();
const express = require('express');
const fs = require('fs');
const { NlpManager } = require('node-nlp');
const path = require('path');
const {v4: uuid} = require('uuid')

const chatbotRoute = express.Router();
const questionsRoute = express.Router();

const manager = new NlpManager({languages: ['en']});



function trainChatbot() {
     
     const trainingData = JSON.parse(fs.readFileSync('trainingData.json', 'utf8'));
     const modelFilePath = path.join(__dirname, '..', 'model.nlp');
     console.log(modelFilePath);
     if(fs.existsSync(modelFilePath)){
          fs.unlink(modelFilePath, error => {
               if(error){
                    console.log("error deleting MODEL FILE");
               }

               
          })
     }

     trainingData.forEach(({ intent, questions, answers }) => {
          questions.forEach((question) => {
               manager.addDocument('en', question, intent);
          });
          answers.forEach((answer) => {
               manager.addAnswer('en', intent, answer);
          });
     });
     connection.query('select * from questions where answer is not null and intent is not null', (err, results) => {
          if(err){
               return;
          }

          results.forEach((row) => {
               const {title, intent, answer} = row;
               try {
                    const parsedAns = JSON.parse(answer);
                    manager.addDocument("en", title, intent);
                    manager.addAnswer("en", intent, parsedAns.ans);
               } catch (error) {
                    console.log(error);
               }
          });

          (async () => {
               await manager.train();
               manager.save();
          })();
          
     });
     
}

trainChatbot();


const questionResponses = new Map();

//just trying


function constructResponseUsingKeywords(responses, keywords = []) {
     if (responses.length === 0) {
       return '';
     }
     
     // Choose a random response
     const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
     
     // Replace placeholders with keywords
     const responseWithKeywords = selectedResponse.replace(/\{(\d+)\}/g, (match, index) => {
       const keyword = keywords[index] || ''; // Use keyword or empty string if not available
       return keyword;
     });
   
     return responseWithKeywords;
   }



   chatbotRoute.post('/ask', async (req,res) => {
     const question  = req.body.question;
     try {
          let answer;
          if (questionResponses.has(question)) {
            const responses = questionResponses.get(question);
            answer = responses[Math.floor(Math.random() * responses.length)];
          } else {
            const response = await manager.process('en', question);
            const initialAnswer = response.answer;
      
            // Store the initial response for the question
            questionResponses.set(question, [initialAnswer]);
            answer = initialAnswer;

            if (!answer || answer.trim() === '') {
               const queryString = 'INSERT INTO questions (title) VALUES (?)';
               connection.query(queryString, [question], (err, result) => {
                 if (err) {
                    return;
                 }
               });
             }
          }
      
          res.json({ answer: answer ? answer : "Sorry, try asking your question In a better way so I can help." });
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ answer: "An error occurred while processing your request." });
        }
});

//other routes
questionsRoute.get('/', (req,res) => {
     const searchQuery = 'select title, answer from questions where answer IS NOT NULL';
     connection.query(searchQuery,(error ,data)=> {
          if(error ){
               console.log(error);
               res.status(500).json({message: "Server error"});
          }else if(!data[0]){
               res.status(401).json({message: "No questions available"})
          }else{
               res.status(201).json({questions: data, message: "Answered questions"});
          }
     })
})

questionsRoute.get('/unanswered', (req,res) => {
     const searchQuery = 'select title from questions where answer IS NULL';
     connection.query(searchQuery,(error ,data)=> {
          if(error ){
               console.log(error);
               res.status(500).json({message: "Server error"});
          }else if(!data[0]){
               res.status(401).json({message: "No un answered questions available"})
          }else{
               res.status(201).json({questions: data, message: "Displaying questions with out answer"});
          }
     })
});

questionsRoute.post('/answer-question', async (req,res) => {
     const searchQuery = "update  questions set answer = ?, intent = ? where title = ?";
     const Ans = JSON.stringify({ans: req.body.answer}); 
     try {
          connection.query(searchQuery, [Ans, req.body.intent, req.body.title]);
          fs.appendFile('example.json', '\n new answer added', (err) => {
               if(err) {
                    console.log(err);
               }
          })
          res.status(201).json({ message: "Question answered. Thank you for contributing to our chatbot." });
     } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Server error" });
     }
     
})

questionsRoute.post('/train-bot', async (req, res) => {
     try {
          trainChatbot();
          res.status(201).json({message: "Training started"});
     } catch (error) {
          console.log(error)
     }
});

questionsRoute.post('/delete-question', (req,res) =>{
     const deleteQuery= `DELETE FROM questions WHERE title = ?`;
     connection.query(deleteQuery, req.body.title, (err) => {
          if(err){
               console.error(err);
               res.status(500).json({message: "Error deleting the question. Try again later."});
               return;
          }

          res.status(201).json({message: "Deleted the question successfully!!"});
     })
})

questionsRoute.post('/client-message', (req, res) => {
     const query = "INSERT INTO supportTable values (?, ?, ?, ?, ?, NOW())  ";
     
     const Values = [uuid(), req.body.name, req.body.email, req.body.phone, req.body.message ];
     connection.query(query, Values, (err) => {
          if(err) {
               res.status(401).json({message: "Error sending the message please try again later"});
          }else{
               res.status(201).json({message: "Your message has been sent successfully. Our Team will reach you soon."})
          }
     })
});

questionsRoute.get('/get-clientMessages', (req, res) => {

});

questionsRoute.get('/client-messages', (req, res) => {
     const query = 'select name, email, phone, message, date from supportTable';

     try {
          connection.query(query, (err, data) => {
               if(err){
                    res.status(500).json({message:"server error"});
               }else{
                    res.status(201).json({questions: data});
               }
          }) 
     } catch (error) {
          console.log(error)
     }
})



module.exports = {chatbotRoute, questionsRoute}





// chatbotRoute.post('/ask', async (req, res) => {
//      const question = req.body.question;
//      try {
//           let answer;
//           if (questionResponses.has(question)) {
//           // Use keywords to construct a response
//           const responses = questionResponses.get(question);
//           answer = constructResponseUsingKeywords(responses);
//           } else {
//           // Process question, get response and keywords
//           const response = await manager.process('en', question);
//           const initialAnswer = response.answer;
//           const keywords = response.entities.map(entity => entity.value);
          
//           // Construct a response using keywords
//           answer = constructResponseUsingKeywords([initialAnswer], keywords);
     
//           if (!answer || answer.trim() === '') {
//                // Store the new question in the database
//                const queryString = 'INSERT INTO questions (title) VALUES (?)';
//                connection.query(queryString, [question], (err, result) => {
//                if (err) {
//                     return;
//                }
//                });
//           }
//           }
     
//           res.json({ answer: answer ? answer : "Sorry, try asking your question in a better way so I can help." });
//      } catch (error) {
//           console.error('Error:', error);
//           res.status(500).json({ answer: "An error occurred while processing your request." });
//      }
//      });