const { Router } = require('express');
const userTrainingController = require('./userTraining.contoller');
const userTrainingRouter = Router();

userTrainingRouter.get('/', userTrainingController.getUsers);

module.exports = userTrainingRouter;
