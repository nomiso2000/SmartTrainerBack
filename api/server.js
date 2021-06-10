const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./users/user.router');
const userTrainingRouter = require('./userTraining/userTraining.router');

require('dotenv').config();

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
    this.server.listen(process.env.PORT || 3001, () => {
      console.log('Server is listen on port', process.env.PORT);
    });
  }
};
