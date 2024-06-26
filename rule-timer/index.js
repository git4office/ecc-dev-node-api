const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql/msnodesqlv8');
var cors = require('cors') // This is better than using header

var port = require('./const');

const anaRoutes = require('./routes/router-ruletimer');
const cluster = require('cluster');
 
// Check the number of available CPU.
const numCPUs = require('os').cpus().length;


const app = express();
//const port = process.env.PORT || 1010;

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));


//console.log('This is our node app');
//console.log(port)

//app.use(bodyParser.urlencoded({extended: false})); // This is for form post
app.use(bodyParser.json()); // application/json

app.use(cors());


//app.use(userRoutes);

app.use(anaRoutes)


/*
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
 });
*/
 if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
 
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
 
  // This event is first when worker died
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}
 
// For Worker
else{
 
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  app.listen(port, err =>{
    err ? 
    console.log("Error in server setup") :
    console.log(`Worker ${process.pid} started`);
  });
}