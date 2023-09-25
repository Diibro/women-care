const {server, app}  = require('./index');

const { spawn } = require('child_process');

// Spawn a new instance of the startup script using nodemon
const restartServerProcess = spawn('nodemon', ['index.js']); // Replace 'index.js' with the actual script name
restartServerProcess.on('exit', (code) => {
  console.log(`Server restart process exited with code ${code}`);
});

// Handle SIGINT (Ctrl+C) signal to shut down the server gracefully
process.on('SIGINT', () => {
  console.log('Received SIGINT signal. Shutting down server gracefully...');
  restartServerProcess.kill('SIGINT'); // Kill the nodemon process
  process.exit(0);
});