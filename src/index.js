import cluster from 'cluster';
import app from 'app';
import db from 'db';

// Run express
app.run();

// Once node executes cluster() the current process will be forked the specified number of times.
// Let's guard any code that should only be run in the master behind
if (cluster.isMaster) {
  // Run mongodb
  db.run();

  // something to show stack traces of async exceptions
  process.on('unhandledRejection', (err) => {
    throw err;
  });
}
