const Joi = require('joi');
const userModel = require('./user.model');
const trainingModel = require('../userTraining/userTraining.model');
const ms = require('ms');
const jwt = require('jsonwebtoken');
const { DateTime } = require('luxon');
const {
  kkalCalc,
  userTrainingUpdate,
  uploadedTrainingFunc,
  getUserWeekMenu,
  countWater,
} = require('../utils/helpers');

require('dotenv').config();
class UserController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userModel.find({ email: email });
      if (!user || user.status !== 'Verified') {
        return res.status(401).send('Authentification failed');
      }
      const isPasswordValid = password === user[0].password ? true : false;
      if (!isPasswordValid) {
        return res.status(401).send('Email or password is wrong');
      }
      const token = await jwt.sign(
        { id: user[0]._id },
        process.env.JWT_SECRET,
        {
          expiresIn: ms('2 days'),
        }
      );
      await userModel.updateToken(user[0]._id, token);
      return res.status(200).json({
        token,
        email: user[0].email,
        _id: user[0]._id,
        kkal: user[0].kkal,
        gender: user[0].gender,
        countUpdate: user[0].countUpdate,
      });
    } catch (err) {
      next(err);
    }
  }

  async signOut(req, res, next) {
    try {
      const user = req.user;
      if (!user._id) {
        throw new UnauthorizedError('User not authorized');
      }
      await userModel.updateToken(user._id, null);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
  async _getCurrentUser(req, res, next) {
    try {
      return res.status(200).json({ email: req.user.email });
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      req.body['countUpdate'] = {
        Chest: 1,
        Legs: 1,
        Hands: 1,
        Back: 1,
        Shoulders: 1,
      };
      const newUser = await userModel.create(req.body);
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: ms('2 days'),
      });
      await userModel.updateToken(newUser._id, token);
      return res.status(201).json({
        id: newUser._id,
        email: newUser.email,
        token,
        countUpdate: newUser.countUpdate,
      });
    } catch (err) {
      next(err);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userModel.find();
      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
  async getUserTrainingById(req, res, next) {
    try {
      const id = req.params.id;

      let user = await userModel.findById(id);
      const updateOrNot = userTrainingUpdate(user.training);
      if (updateOrNot === undefined) {
        const training = await trainingModel.find({ name: user.sport });

        const uploadedTraining = uploadedTrainingFunc(
          user.targetWeekTime,
          training[0],
          user.weight,
          user.changeWeight,
          user.difficult
        );
        user = await userModel.findByIdAndUpdate(id, {
          $set: { training: uploadedTraining },
        });
      }
      if (!user) {
        return res.status(404).send();
      }

      return res.status(200).json(user.training);
    } catch (err) {
      next(err);
    }
  }
  // async deleteUserById(req, res, next) {
  //   try {
  //     const id = req.params.id;

  //     const deletedUser = await userModel.findByIdAndDelete(id);

  //     if (!deletedUser) {
  //       return res.status(404).send();
  //     }

  //     return res.status(204).send();
  //   } catch (err) {
  //     next(err);
  //   }
  // }
  async getCurrentUser(req, res, next) {
    try {
      return res.status(200).json({
        email: req.user.email,
        _id: req.user._id,
        kkal: req.user.kkal,
        gender: req.user.gender,
        lastUpdate: req.user.lastUpdate,
        menu: req.user.menu,
        water: req.user.water,
      });
    } catch (err) {
      next(err);
    }
  }
  // async updateUser(req, res, next) {
  //   try {
  //     const userId = req.params.id;

  //     const userToUpdate = await userModel.findByIdAndUpdate(userId, {
  //       $set: req.body,
  //     });

  //     if (!userToUpdate) {
  //       return res.status(404).send();
  //     }
  //     return res.status(204).send();
  //   } catch (err) {
  //     next(err);
  //   }
  // }
  async updateUserInfo(req, res, next) {
    try {
      const userId = req.params.userId;
      const kkal = kkalCalc(req.body);
      const water = countWater(req.body);
      req.body['kkal'] = kkal;
      req.body['water'] = water;
      const userMenu = getUserWeekMenu(kkal);
      req.body['menu'] = userMenu;
      let userToUpdate = await userModel.findByIdAndUpdate(userId, {
        $set: req.body,
      });

      const training = await trainingModel.find({ name: req.body.sport });
      const uploadedTraining = uploadedTrainingFunc(
        req.body.targetWeekTime,
        training[0],
        req.body.weight,
        req.body.changeWeight,
        req.body.difficult
      );

      userToUpdate = await userModel.findByIdAndUpdate(userId, {
        $set: { training: uploadedTraining },
      });
      if (!userToUpdate) {
        return res.status(404).send();
      }
      return res.status(200).json({ uploadedTraining });
      // next();
    } catch (err) {
      next(err);
    }
  }

  async findTrainByDate(req, res, next) {
    try {
      const user = await userModel.findById(req.params.userId);
      const returned = user.historyTraining.filter(
        (el) => el.data === req.body.date
      );

      return res.status(201).json(returned);
    } catch (err) {
      next(err);
    }
  }
  async addToHistory(req, res, next) {
    try {
      const userId = req.params.userId;
      const addTraining = req.body;
      let userToUpdate = await userModel.findByIdAndUpdate(userId, {
        $set: { historyTraining: addTraining },
      });
      if (!userToUpdate) {
        return res.status(404).send();
      }
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
  async updateMuscleTraining(req, res, next) {
    try {
      const userId = req.params.userId;
      let user = await userModel.findById(userId);
      const todayIs = DateTime.now().toString().substring(0, 10);
      const muscles = [];
      for (let i = 0; req.body.train.length > i; i++) {
        muscles.find((el) => req.body.train[i].muscle === el)
          ? console.log('true')
          : muscles.push(req.body.train[i].muscle);
      }

      if (req.body.question === 'hard') {
        for (let i = 0; i < muscles.length; i++) {
          let name = muscles[i];
          user.countUpdate[name] = user.countUpdate[name] - 0.1;
        }
      }
      if (req.body.question === 'easy') {
        for (let i = 0; i < muscles.length; i++) {
          let name = muscles[i];
          user.countUpdate[name] = user.countUpdate[name] + 0.1;
        }
      }

      let userToUpdate = await userModel.findByIdAndUpdate(userId, {
        $set: { countUpdate: user.countUpdate, lastUpdate: todayIs },
      });
      if (!userToUpdate) {
        return res.status(404).send();
      }
      return res.status(200).json({ lastUpdate: todayIs });
    } catch (err) {
      next(err);
    }
  }

  validateCreateUser(req, res, next) {
    const validateRules = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const validateResult = validateRules.validate(req.body);
    if (validateResult.error) {
      return res.status(400).send(validateResult.error);
    }

    next();
  }
  validateSendedForm(req, res, next) {
    const validateRules = Joi.object({
      age: Joi.number().required(),
      height: Joi.number().required(),
      weight: Joi.number().required(),
      targetWeekTime: Joi.string().required(),
      changeWeight: Joi.string().required(),
      gender: Joi.string().required(),
      difficult: Joi.string().required(),
    });
    const validateResult = validateRules.validate(req.body);
    if (validateResult.error) {
      return res.status(400).send(validateResult.error);
    }

    next();
  }
  async authorize(req, res, next) {
    try {
      const authorizationHeader = req.get('Authorization') || '';
      const token = authorizationHeader.replace('Bearer ', '');

      let userId;

      try {
        userId = await jwt.verify(token, process.env.JWT_SECRET).userId;
        if (userId === undefined)
          userId = await jwt.verify(token, process.env.JWT_SECRET).id;

        // userId = await jwt.verify(token, process.env.JWT_SECRET).id;
      } catch (err) {
        // next(new UnauthorizedError('User not authorized'));
        console.log('EERROR');
        console.log(err);
      }
      const user = await userModel.findById(userId);
      // if (!user || user.token !== token) {
      //   throw new UnauthorizedError('User not authorized');
      // }
      req.user = user;
      req.token = token;

      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
