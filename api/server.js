const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./users/user.router');
const userTrainingRouter = require('./userTraining/userTraining.router');

require('dotenv').config();
const PORT = process.env.PORT || 80;

//1. Creat e server
//2. inint global madl
//3. init routes
//4. init db
//5. start listening

module.exports = class UserServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDatabase();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }
  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }
  initRoutes() {
    this.server.use('/users', userRouter);
    this.server.use('/training', userTrainingRouter);
    this.server.get('/', (req, res) => {
      res.end('<h1>HOMEPAGE<h1>');
    });
    this.server.get('/about', (req, res) => {
      res.end('<h1>ABOUT PAGE<h1>');
    });
  }
  async initDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log('Database connection successful');
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log('Server is listen on port', PORT);
    });
  }
};
