const { number } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const trainingSchema = new Schema({
  name: String,
  Legs: [
    {
      name: String,
      videoDescr: String,
      mainMuscle: String,
      additionMuscle: String,
      muscle: String,
      flag: String,
      povtorenia: { type: Number },
      ves: { type: Number },
      podhod: { type: Number },
    },
  ],
  Back: [
    {
      name: String,
      videoDescr: String,
      mainMuscle: String,
      additionMuscle: String,
      muscle: String,
      flag: String,
      povtorenia: { type: Number },
      ves: { type: Number },
      podhod: { type: Number },
    },
  ],
  Chest: [
    {
      name: String,
      videoDescr: String,
      mainMuscle: String,
      additionMuscle: String,
      muscle: String,
      flag: String,
      povtorenia: { type: Number },
      ves: { type: Number },
      podhod: { type: Number },
    },
  ],
  Hands: [
    {
      name: String,
      videoDescr: String,
      mainMuscle: String,
      additionMuscle: String,
      muscle: String,
      flag: String,
      povtorenia: { type: Number },
      ves: { type: Number },
      podhod: { type: Number },
    },
  ],
  Shoulders: [
    {
      name: String,
      videoDescr: String,
      mainMuscle: String,
      additionMuscle: String,
      muscle: String,
      flag: String,
      povtorenia: { type: Number },
      ves: { type: Number },
      podhod: { type: Number },
    },
  ],
  Press: [
    {
      name: String,

      trains: [
        {
          name: String,
          videoDescr: String,
          mainMuscle: String,
          additionMuscle: String,
          forMan: {
            povtorenia: { type: Number },
            ves: { type: Number },
            podhod: { type: Number },
          },
        },
      ],
    },
  ],
  Butt: [
    {
      name: String,

      trains: [
        {
          name: String,
          videoDescr: String,
          mainMuscle: String,
          additionMuscle: String,
          forMan: {
            povtorenia: { type: Number },
            ves: { type: Number },
            podhod: { type: Number },
          },
        },
      ],
    },
  ],
});

// userSchema.statics.updateToken = updateToken;

// async function updateToken(id, newToken) {
//   return this.findByIdAndUpdate(id, { token: newToken });
// }

//trainings
const userTrainingModel = mongoose.model('Training', trainingSchema);

module.exports = userTrainingModel;
