const Joi = require('joi');
const userTrainingModel = require('./userTraining.model');
const userModel = require('../users/user.model');
const ms = require('ms');
const jwt = require('jsonwebtoken');

require('dotenv').config();
class UserTrainingController {
  //   async createUser(req, res, next) {
  //     try {
  //       const newUser = await userModel.create(req.body);
  //       console.log('newUser._id', newUser._id);

  //       // const token = await jwt.sign(
  //       //   { id: newUser._id },
  //       //   process.env.JWT_SECRET,
  //       //   {
  //       //     expiresIn: ms('2 days'),
  //       //   }
  //       // );
  //       const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
  //         expiresIn: ms('2 days'),
  //       });
  //       await userModel.updateToken(newUser._id, token);
  //       return res
  //         .status(201)
  //         .json({ id: newUser._id, email: newUser.email, token });
  //     } catch (err) {
  //       next(err);
  //     }
  //   }
  async getUsers(req, res, next) {
    try {
      const training = await userTrainingModel.find();

      return res.status(200).json(training);
    } catch (err) {
      next(err);
    }
  }

  async getUserTraining(req, res, next) {
    try {
      const training = await userModel.find();
      return res.status(200).json(training);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserTrainingController();
