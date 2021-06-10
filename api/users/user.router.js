const { Router } = require('express');
const userController = require('./user.controller');
const userRouter = Router();

userRouter.get(
  '/current',
  userController.authorize,
  userController.getCurrentUser
);
userRouter.put('/login', userController.login);
userRouter.put('/findTrainByDate/:userId', userController.findTrainByDate);
userRouter.post(
  '/',
  userController.validateCreateUser,
  userController.createUser
);
userRouter.patch('/historyTraining/:userId', userController.addToHistory);
userRouter.patch(
  '/muscleTraining/:userId',
  userController.updateMuscleTraining
);
userRouter.patch('/sign-out', userController.authorize, userController.signOut);
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserTrainingById);
// userRouter.delete('/:id', userController.deleteUserById);
// userRouter.patch(
//   '/:id',
//   // userController.validateUpdateUser,
//   userController.updateUser
// );
userRouter.patch(
  '/:userId',
  // userController.validateSendedForm,
  userController.updateUserInfo
);

module.exports = userRouter;
