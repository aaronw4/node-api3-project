const express = require('express');
const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());
server.use(logger);


server.use('/api/users', userRouter)


function logger(req, res, next) {
  console.log(`${req.method} from ${req.url} at ${Date.now().toString()}`);
  next();
}


module.exports = server;
