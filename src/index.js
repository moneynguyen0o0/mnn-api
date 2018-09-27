import app from 'app';
import db from 'db';

// Run express
app.run();

// Run mongodb
db.run();

// something to show stack traces of async exceptions
process.on('unhandledRejection', (err) => {
  throw err;
});
