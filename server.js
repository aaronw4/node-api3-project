const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

function logger(req, res, next) {
  console.log(`${req.method} from ${req.url} at ${Date()}`);
  next();
}

module.exports = server;
