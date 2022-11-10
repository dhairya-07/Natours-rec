const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Uncaught Exceptions do not occur asynchronously
process.on('uncaughtException', err => {
  console.log('UNHANDLED REJECTION 💥, SHUTTING DOWN...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

const port = 3000 || process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// Pure project me kahi bhi promise reject hoga to wo yaha ayega
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION 💥, SHUTTING DOWN...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
