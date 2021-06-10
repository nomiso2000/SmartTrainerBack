const { number } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: { type: String, require: true },
  password: { type: String, require: true },
  token: { type: String, required: false },
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  water: { type: Number },
  countUpdate: {
    Chest: { type: Number },
    Legs: { type: Number },
    Hands: { type: Number },
    Back: { type: Number },
    Shoulders: { type: Number },
  },
  historyTraining: [
    {
      data: String,
      train: [
        {
          name: String,
          videoDescr: String,
          mainMuscle: String,
          additionMuscle: String,
          povtorenia: { type: Number },
          ves: { type: Number },
          podhod: { type: Number },
        },
      ],
    },
  ],
  changeWeight: String,
  sport: String,
  gender: String,
  targetWeekTime: Number,
  difficult: String,
  lastUpdate: String,
  kkal: Number,
  menu: [
    {
      name: String,
      day: String,
      dayMenu: {
        breakfast: String,
        secondBreakfast: String,
        dinner: String,
        afternoonSnack: String,
        supper: String,
      },
    },
  ],
  training: [
    {
      name: String,
      day: String,
      trainName: String,
      train: [
        {
          muscle: String,
          name: String,
          videoDescr: String,
          mainMuscle: String,
          additionMuscle: String,
          povtorenia: { type: Number },
          ves: { type: Number },
          podhod: { type: Number },
        },
      ],
    },
  ],
});

userSchema.statics.updateToken = updateToken;

async function updateToken(id, newToken) {
  return this.findByIdAndUpdate(id, { token: newToken });
}

//users
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
