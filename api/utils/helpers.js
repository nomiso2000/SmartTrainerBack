const { DateTime } = require('luxon');
const startWeek = DateTime.local().startOf('week');
const todayIs = DateTime.now().toString().substring(0, 10);
// export function nameOfDaysFunc() {
//   nameOfdays.map((el, index) => {
//     el.date = startWeek.plus({ days: index }).toFormat('yyyy-MM-dd');
//   });
//   return nameOfdays;
// }

function uploadedTrainingFunc(
  targetWeekTime,
  training,
  weight,
  changeWeight,
  difficult
) {
  if (targetWeekTime === '2' || targetWeekTime === 2) {
    return trainingCalc2(training, weight, changeWeight, difficult);
  }
  if (targetWeekTime === '3' || targetWeekTime === 3) {
    return trainingCalc3(training, weight, changeWeight, difficult);
  }
  if (targetWeekTime === '4' || targetWeekTime === 4) {
    return trainingCalc4(training, weight, changeWeight, difficult);
  }
  if (targetWeekTime === '5' || targetWeekTime === 5) {
    return trainingCalc5(training, weight, changeWeight, difficult);
  }
}

function changeWeightConvVes(changeWeight) {
  if (changeWeight === 'less') return 0.8;
  if (changeWeight === 'more') return 1.2;
  if (changeWeight === 'muscle') return 1;
}

function changeWeightConvPovtor(changeWeight) {
  if (changeWeight === 'less') return 1.8;
  if (changeWeight === 'more') return 0.5;
  if (changeWeight === 'muscle') return 1;
}
function difficultConv(difficult) {
  if (difficult === 'easy') return 0.3;
  if (difficult === 'normal') return 0.7;
  if (difficult === 'hard') return 1;
}

function trainingCalc3(trainingArray, weight, changeWeight, difficult) {
  const ChestMain = [];
  const ChestAddition = [];
  const BackMain = [];
  const BackAddition = [];
  const HandsMain = [];
  const HandsAddition = [];
  const LegsMain = [];
  const LegsAddition = [];
  const ShouldersMain = [];
  const ShouldersAddition = [];
  for (let i = 0; ChestMain.length < 2 || ChestAddition.length < 2; i++) {
    trainingArray.Chest[i].ves =
      trainingArray.Chest[i].ves *
      changeWeightConvVes(changeWeight) *
      weight *
      difficultConv(difficult);
    trainingArray.Chest[i].ves = Math.floor(trainingArray.Chest[i].ves);

    trainingArray.Chest[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Chest[i].povtorenia;

    if (trainingArray.Chest[i].flag === 'Main' && ChestMain.length < 2) {
      ChestMain.push(trainingArray.Chest[i]);
    }
    if (
      trainingArray.Chest[i].flag === 'Addition' &&
      ChestAddition.length < 2
    ) {
      ChestAddition.push(trainingArray.Chest[i]);
    }
  }
  for (let i = 0; BackMain.length <= 1 || BackAddition.length < 2; i++) {
    trainingArray.Back[i].ves =
      trainingArray.Back[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Back[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Back[i].povtorenia;

    if (trainingArray.Back[i].flag === 'Main' && BackMain.length <= 1) {
      BackMain.push(trainingArray.Back[i]);
    }
    if (trainingArray.Back[i].flag === 'Addition' && BackAddition.length < 2) {
      BackAddition.push(trainingArray.Back[i]);
    }
  }
  for (let i = 0; HandsMain.length < 1 || HandsAddition.length < 2; i++) {
    trainingArray.Hands[i].ves =
      trainingArray.Hands[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Hands[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Hands[i].povtorenia;

    if (trainingArray.Hands[i].flag === 'Main' && HandsMain.length < 1) {
      HandsMain.push(trainingArray.Hands[i]);
    }
    if (
      trainingArray.Hands[i].flag === 'Addition' &&
      HandsAddition.length < 2
    ) {
      HandsAddition.push(trainingArray.Hands[i]);
    }
  }

  for (let i = 0; LegsMain.length < 1 || LegsAddition.length < 2; i++) {
    trainingArray.Legs[i].ves =
      trainingArray.Legs[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Legs[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Legs[i].povtorenia;

    if (trainingArray.Legs[i].flag === 'Main' && LegsMain.length < 1) {
      LegsMain.push(trainingArray.Legs[i]);
    }
    if (trainingArray.Legs[i].flag === 'Addition' && LegsAddition.length < 2) {
      LegsAddition.push(trainingArray.Legs[i]);
    }
  }

  for (
    let i = 0;
    ShouldersMain.length < 1 || ShouldersAddition.length < 2;
    i++
  ) {
    trainingArray.Shoulders[i].ves =
      trainingArray.Shoulders[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Shoulders[i].povtorenia =
      changeWeightConvPovtor(changeWeight) *
      trainingArray.Shoulders[i].povtorenia;

    if (
      trainingArray.Shoulders[i].flag === 'Main' &&
      ShouldersMain.length < 1
    ) {
      ShouldersMain.push(trainingArray.Shoulders[i]);
    }
    if (
      trainingArray.Shoulders[i].flag === 'Addition' &&
      ShouldersAddition.length < 2
    ) {
      ShouldersAddition.push(trainingArray.Shoulders[i]);
    }
  }

  const uploadedTraining = [
    {
      name: 'Monday',
      day: startWeek.plus({ days: 0 }).toFormat('yyyy-MM-dd'),
      trainName: 'Chest',
      train: [...ChestMain, ...ChestAddition],
    },
    {
      name: 'Wednesday',
      day: startWeek.plus({ days: 2 }).toFormat('yyyy-MM-dd'),
      trainName: 'BackHands',
      train: [...BackMain, ...BackAddition, ...HandsMain, ...HandsAddition],
    },
    {
      name: 'Friday',
      day: startWeek.plus({ days: 4 }).toFormat('yyyy-MM-dd'),
      trainName: 'LegsShoulder',
      train: [
        ...LegsMain,
        ...LegsAddition,
        ...ShouldersMain,
        ...ShouldersAddition,
      ],
    },
  ];
  return uploadedTraining;
}

function trainingCalc2(trainingArray, weight, changeWeight, difficult) {
  const ChestMain = [];
  const ChestAddition = [];
  const BackMain = [];
  const BackAddition = [];
  const HandsMain = [];
  const HandsAddition = [];
  const LegsMain = [];
  const LegsAddition = [];
  const ShouldersMain = [];
  const ShouldersAddition = [];
  for (let i = 0; ChestMain.length < 1 || ChestAddition.length < 1; i++) {
    trainingArray.Chest[i].ves =
      trainingArray.Chest[i].ves *
      changeWeightConvVes(changeWeight) *
      weight *
      difficultConv(difficult);
    trainingArray.Chest[i].ves = Math.floor(trainingArray.Chest[i].ves);

    trainingArray.Chest[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Chest[i].povtorenia;

    if (trainingArray.Chest[i].flag === 'Main' && ChestMain.length < 1) {
      ChestMain.push(trainingArray.Chest[i]);
    }
    if (
      trainingArray.Chest[i].flag === 'Addition' &&
      ChestAddition.length < 1
    ) {
      ChestAddition.push(trainingArray.Chest[i]);
    }
  }
  for (let i = 0; BackMain.length <= 1 || BackAddition.length < 1; i++) {
    trainingArray.Back[i].ves =
      trainingArray.Back[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Back[i].ves = Math.floor(trainingArray.Back[i].ves);
    trainingArray.Back[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Back[i].povtorenia;

    if (trainingArray.Back[i].flag === 'Main' && BackMain.length <= 1) {
      BackMain.push(trainingArray.Back[i]);
    }
    if (trainingArray.Back[i].flag === 'Addition' && BackAddition.length < 2) {
      BackAddition.push(trainingArray.Back[i]);
    }
  }
  for (let i = 0; HandsMain.length < 1 || HandsAddition.length < 1; i++) {
    console.log('SASAS', trainingArray.Hands[i].ves);
    trainingArray.Hands[i].ves =
      trainingArray.Hands[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Hands[i].ves = Math.floor(trainingArray.Hands[i].ves);
    trainingArray.Hands[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Hands[i].povtorenia;

    if (trainingArray.Hands[i].flag === 'Main' && HandsMain.length < 1) {
      HandsMain.push(trainingArray.Hands[i]);
    }
    if (
      trainingArray.Hands[i].flag === 'Addition' &&
      HandsAddition.length < 1
    ) {
      HandsAddition.push(trainingArray.Hands[i]);
    }
  }

  for (let i = 0; LegsMain.length < 1 || LegsAddition.length < 1; i++) {
    trainingArray.Legs[i].ves =
      trainingArray.Legs[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Legs[i].ves = Math.floor(trainingArray.Legs[i].ves);
    trainingArray.Legs[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Legs[i].povtorenia;

    if (trainingArray.Legs[i].flag === 'Main' && LegsMain.length < 1) {
      LegsMain.push(trainingArray.Legs[i]);
    }
    if (trainingArray.Legs[i].flag === 'Addition' && LegsAddition.length < 1) {
      LegsAddition.push(trainingArray.Legs[i]);
    }
  }

  for (
    let i = 0;
    ShouldersMain.length < 1 || ShouldersAddition.length < 1;
    i++
  ) {
    trainingArray.Shoulders[i].ves =
      trainingArray.Shoulders[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Shoulders[i].ves = Math.floor(trainingArray.Shoulders[i].ves);
    trainingArray.Shoulders[i].povtorenia =
      changeWeightConvPovtor(changeWeight) *
      trainingArray.Shoulders[i].povtorenia;

    if (
      trainingArray.Shoulders[i].flag === 'Main' &&
      ShouldersMain.length < 1
    ) {
      ShouldersMain.push(trainingArray.Shoulders[i]);
    }
    if (
      trainingArray.Shoulders[i].flag === 'Addition' &&
      ShouldersAddition.length < 1
    ) {
      ShouldersAddition.push(trainingArray.Shoulders[i]);
    }
  }

  const uploadedTraining = [
    {
      name: 'Monday',
      day: startWeek.plus({ days: 0 }).toFormat('yyyy-MM-dd'),
      trainName: 'ChestBack',
      train: [...ChestMain, ...ChestAddition, ...BackMain, ...BackAddition],
    },
    {
      name: 'Friday',
      day: startWeek.plus({ days: 4 }).toFormat('yyyy-MM-dd'),
      trainName: 'LegsShoulderHands',
      train: [
        ...LegsMain,
        ...LegsAddition,
        ...ShouldersMain,
        ...ShouldersAddition,
        ...HandsMain,
        ...HandsAddition,
      ],
    },
  ];
  return uploadedTraining;
}

function trainingCalc4(trainingArray, weight, changeWeight, difficult) {
  const ChestMain = [];
  const ChestAddition = [];
  const BackMain = [];
  const BackAddition = [];
  const HandsMain = [];
  const HandsAddition = [];
  const LegsMain = [];
  const LegsAddition = [];
  const ShouldersMain = [];
  const ShouldersAddition = [];
  for (let i = 0; ChestMain.length < 2 || ChestAddition.length < 3; i++) {
    trainingArray.Chest[i].ves =
      trainingArray.Chest[i].ves *
      changeWeightConvVes(changeWeight) *
      weight *
      difficultConv(difficult);
    trainingArray.Chest[i].ves = Math.floor(trainingArray.Chest[i].ves);

    trainingArray.Chest[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Chest[i].povtorenia;

    if (trainingArray.Chest[i].flag === 'Main' && ChestMain.length < 2) {
      ChestMain.push(trainingArray.Chest[i]);
    }
    if (
      trainingArray.Chest[i].flag === 'Addition' &&
      ChestAddition.length < 3
    ) {
      ChestAddition.push(trainingArray.Chest[i]);
    }
  }

  for (let i = 0; BackMain.length < 2 || BackAddition.length < 3; i++) {
    trainingArray.Back[i].ves =
      trainingArray.Back[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Back[i].ves = Math.floor(trainingArray.Back[i].ves);
    trainingArray.Back[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Back[i].povtorenia;

    if (trainingArray.Back[i].flag === 'Main' && BackMain.length < 2) {
      BackMain.push(trainingArray.Back[i]);
    }
    if (trainingArray.Back[i].flag === 'Addition' && BackAddition.length < 3) {
      BackAddition.push(trainingArray.Back[i]);
    }
  }
  for (let i = 0; HandsMain.length < 1 || HandsAddition.length < 2; i++) {
    trainingArray.Hands[i].ves =
      trainingArray.Hands[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Hands[i].ves = Math.floor(trainingArray.Hands[i].ves);

    trainingArray.Hands[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Hands[i].povtorenia;

    if (trainingArray.Hands[i].flag === 'Main' && HandsMain.length < 1) {
      HandsMain.push(trainingArray.Hands[i]);
    }
    if (
      trainingArray.Hands[i].flag === 'Addition' &&
      HandsAddition.length < 2
    ) {
      HandsAddition.push(trainingArray.Hands[i]);
    }
  }

  for (let i = 0; LegsMain.length < 2 || LegsAddition.length < 3; i++) {
    trainingArray.Legs[i].ves =
      trainingArray.Legs[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Legs[i].ves = Math.floor(trainingArray.Legs[i].ves);
    trainingArray.Legs[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Legs[i].povtorenia;

    if (trainingArray.Legs[i].flag === 'Main' && LegsMain.length < 2) {
      LegsMain.push(trainingArray.Legs[i]);
    }
    if (trainingArray.Legs[i].flag === 'Addition' && LegsAddition.length < 3) {
      LegsAddition.push(trainingArray.Legs[i]);
    }
  }

  for (
    let i = 0;
    ShouldersMain.length < 1 || ShouldersAddition.length < 2;
    i++
  ) {
    trainingArray.Shoulders[i].ves =
      trainingArray.Shoulders[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Shoulders[i].ves = Math.floor(trainingArray.Shoulders[i].ves);
    trainingArray.Shoulders[i].povtorenia =
      changeWeightConvPovtor(changeWeight) *
      trainingArray.Shoulders[i].povtorenia;

    if (
      trainingArray.Shoulders[i].flag === 'Main' &&
      ShouldersMain.length < 1
    ) {
      ShouldersMain.push(trainingArray.Shoulders[i]);
    }
    if (
      trainingArray.Shoulders[i].flag === 'Addition' &&
      ShouldersAddition.length < 2
    ) {
      ShouldersAddition.push(trainingArray.Shoulders[i]);
    }
  }

  const uploadedTraining = [
    {
      name: 'Monday',
      day: startWeek.plus({ days: 0 }).toFormat('yyyy-MM-dd'),
      trainName: 'Chest',
      train: [...ChestMain, ...ChestAddition],
    },
    {
      name: 'Tuesday',
      day: startWeek.plus({ days: 1 }).toFormat('yyyy-MM-dd'),
      trainName: 'Back',
      train: [...BackMain, ...BackAddition],
    },
    {
      name: 'Thursday',
      day: startWeek.plus({ days: 3 }).toFormat('yyyy-MM-dd'),
      trainName: 'ShoulderHands',
      train: [
        ...ShouldersMain,
        ...ShouldersAddition,
        ...HandsMain,
        ...HandsAddition,
      ],
    },
    {
      name: 'Friday',
      day: startWeek.plus({ days: 4 }).toFormat('yyyy-MM-dd'),
      trainName: 'Legs',
      train: [...LegsMain, ...LegsAddition],
    },
  ];
  return uploadedTraining;
}

function trainingCalc5(trainingArray, weight, changeWeight, difficult) {
  const ChestMain = [];
  const ChestAddition = [];
  const BackMain = [];
  const BackAddition = [];
  const HandsMain = [];
  const HandsAddition = [];
  const LegsMain = [];
  const LegsAddition = [];
  const ShouldersMain = [];
  const ShouldersAddition = [];
  for (let i = 0; ChestMain.length < 2 || ChestAddition.length < 3; i++) {
    trainingArray.Chest[i].ves =
      trainingArray.Chest[i].ves *
      changeWeightConvVes(changeWeight) *
      weight *
      difficultConv(difficult);
    trainingArray.Chest[i].ves = Math.floor(trainingArray.Chest[i].ves);

    trainingArray.Chest[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Chest[i].povtorenia;

    if (trainingArray.Chest[i].flag === 'Main' && ChestMain.length < 2) {
      ChestMain.push(trainingArray.Chest[i]);
    }
    if (
      trainingArray.Chest[i].flag === 'Addition' &&
      ChestAddition.length < 3
    ) {
      ChestAddition.push(trainingArray.Chest[i]);
    }
  }

  for (let i = 0; BackMain.length < 2 || BackAddition.length < 3; i++) {
    trainingArray.Back[i].ves =
      trainingArray.Back[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Back[i].ves = Math.floor(trainingArray.Back[i].ves);
    trainingArray.Back[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Back[i].povtorenia;

    if (trainingArray.Back[i].flag === 'Main' && BackMain.length < 2) {
      BackMain.push(trainingArray.Back[i]);
    }
    if (trainingArray.Back[i].flag === 'Addition' && BackAddition.length < 3) {
      BackAddition.push(trainingArray.Back[i]);
    }
  }
  for (let i = 0; HandsMain.length < 2 || HandsAddition.length < 3; i++) {
    trainingArray.Hands[i].ves =
      trainingArray.Hands[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Hands[i].ves = Math.floor(trainingArray.Hands[i].ves);
    trainingArray.Hands[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Hands[i].povtorenia;

    if (trainingArray.Hands[i].flag === 'Main' && HandsMain.length < 2) {
      HandsMain.push(trainingArray.Hands[i]);
    }
    if (
      trainingArray.Hands[i].flag === 'Addition' &&
      HandsAddition.length < 3
    ) {
      HandsAddition.push(trainingArray.Hands[i]);
    }
  }

  for (let i = 0; LegsMain.length < 2 || LegsAddition.length < 3; i++) {
    trainingArray.Legs[i].ves =
      trainingArray.Legs[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Legs[i].ves = Math.floor(trainingArray.Legs[i].ves);
    trainingArray.Legs[i].povtorenia =
      changeWeightConvPovtor(changeWeight) * trainingArray.Legs[i].povtorenia;

    if (trainingArray.Legs[i].flag === 'Main' && LegsMain.length < 2) {
      LegsMain.push(trainingArray.Legs[i]);
    }
    if (trainingArray.Legs[i].flag === 'Addition' && LegsAddition.length < 3) {
      LegsAddition.push(trainingArray.Legs[i]);
    }
  }

  for (
    let i = 0;
    ShouldersMain.length < 2 || ShouldersAddition.length < 3;
    i++
  ) {
    trainingArray.Shoulders[i].ves =
      trainingArray.Shoulders[i].ves *
      weight *
      changeWeightConvVes(changeWeight) *
      difficultConv(difficult);
    trainingArray.Shoulders[i].ves = Math.floor(trainingArray.Shoulders[i].ves);
    trainingArray.Shoulders[i].povtorenia =
      changeWeightConvPovtor(changeWeight) *
      trainingArray.Shoulders[i].povtorenia;

    if (
      trainingArray.Shoulders[i].flag === 'Main' &&
      ShouldersMain.length < 2
    ) {
      ShouldersMain.push(trainingArray.Shoulders[i]);
    }
    if (
      trainingArray.Shoulders[i].flag === 'Addition' &&
      ShouldersAddition.length < 3
    ) {
      ShouldersAddition.push(trainingArray.Shoulders[i]);
    }
  }

  const uploadedTraining = [
    {
      name: 'Monday',
      day: startWeek.plus({ days: 0 }).toFormat('yyyy-MM-dd'),
      trainName: 'Chest',
      train: [...ChestMain, ...ChestAddition],
    },
    {
      name: 'Tuesday',
      day: startWeek.plus({ days: 1 }).toFormat('yyyy-MM-dd'),
      trainName: 'Back',
      train: [...BackMain, ...BackAddition],
    },
    {
      name: 'Wednesday',
      day: startWeek.plus({ days: 2 }).toFormat('yyyy-MM-dd'),
      trainName: 'Shoulder',
      train: [...ShouldersMain, ...ShouldersAddition],
    },
    {
      name: 'Thursday',
      day: startWeek.plus({ days: 3 }).toFormat('yyyy-MM-dd'),
      trainName: 'Hands',
      train: [...HandsMain, ...HandsAddition],
    },
    {
      name: 'Friday',
      day: startWeek.plus({ days: 4 }).toFormat('yyyy-MM-dd'),
      trainName: 'Legs',
      train: [...LegsMain, ...LegsAddition],
    },
  ];

  return uploadedTraining;
}

function kkalCalc(body) {
  let kkalCoef = 1.2;
  let kkal = 0;
  body.targetWeekTime = Number(body.targetWeekTime);

  if (body.targetWeekTime < 4) kkalCoef = 1.375;
  if (body.targetWeekTime >= 4 && body.targetWeekTime < 6) {
    kkalCoef = 1.55;
  }

  if (body.targetWeekTime >= 6) kkalCoef = 1.8;
  if (body.gender === 'male') {
    kkal =
      (88.6 + 13.4 * body.weight + 4.8 * body.height - 5.7 * body.age) *
      kkalCoef;
  }
  if (body.gender === 'female') {
    kkal =
      (447.6 + 9.2 * body.weight + 3.1 * body.height - 4.3 * body.age) *
      kkalCoef;
  }
  if (body.changeWeight === 'more') {
    kkal = kkal + 100;
  }
  if (body.changeWeight === 'less') kkal = kkal - 100;
  return kkal;
}

function stringToNumber(changeWeight, difficult) {
  let kkalCoef = 1.2;
  let kkal = 0;
  if (body.tragetWeekTime < 4) kkalCoef = 1.375;
  if (body.tragetWeekTime >= 4 && body.tragetWeekTime < 6) kkalCoef = 1.55;
  if (body.tragetWeekTime >= 6) kkalCoef = 1.8;

  if (body.gender === 'male') {
    kkal =
      (88.6 + 13.4 * body.weight + 4.8 * body.height - 5.7 * body.age) *
      kkalCoef;
  }
  if (body.gender === 'female') {
    kkal =
      (447.6 + 9.2 * body.weight + 3.1 * body.height - 4.3 * body.age) *
      kkalCoef;
  }
  if (body.changeWeight === 'more') kkal + 100;
  if (body.changeWeight === 'less') kkal - 100;
  return kkal;
}

function userTrainingUpdate(userTraining) {
  const currentWeek = [];
  for (let i = 0; i < 6; i++) {
    currentWeek.push(startWeek.plus({ days: i }).toFormat('yyyy-MM-dd'));
  }
  const resu = currentWeek.find((el) =>
    userTraining.find((ell) => el === ell.day)
  );
  return resu;
}

function getUserWeekMenu(kkal) {
  const uploadedMenu = [
    {
      name: 'Monday',
      day: startWeek.plus({ days: 0 }).toFormat('yyyy-MM-dd'),
      dayMenu: {
        breakfast: `Вівсяна каша на молоці з фруктами - ${Math.floor(
          kkal * 0.1
        )} грам, варені яйця - ${Math.floor(
          kkal * 0.05
        )} грам, молоко/кефір 2.5% жирності -  ${Math.floor(kkal * 0.1)} млгр`,
        secondBreakfast: `молоко/кефір 2.5% жирності -  ${Math.floor(
          kkal * 0.1
        )} млгр, банан(очищений) -  ${Math.floor(kkal * 0.1)} грам`,
        dinner: `куряча грудка відварена -  ${Math.floor(
          kkal * 0.1
        )} грам, гречана каша (готова) -  ${Math.floor(
          kkal * 0.15
        )} грам, овочевий салат - ${Math.floor(
          kkal * 0.15
        )} грам, сок (не концентрат) - ${Math.floor(kkal * 0.1)} млгр `,
        afternoonSnack: `бутерброд з шинкою і сиром- ${Math.floor(
          kkal * 0.05
        )} грам`,
        supper: `отбивна з курицею - ${Math.floor(
          kkal * 0.1
        )} грам, відварені овочі - ${Math.floor(kkal * 0.15)} грам`,
      },
    },
    {
      name: 'Tuesday',
      day: startWeek.plus({ days: 1 }).toFormat('yyyy-MM-dd'),
      dayMenu: {
        breakfast: `Картопляне пюре - ${Math.floor(
          kkal * 0.15
        )} грам, запечена риба - ${Math.floor(
          kkal * 0.1
        )} грам, молоко - ${Math.floor(kkal * 0.1)} млгм`,
        secondBreakfast: `Нежирний творог - ${Math.floor(
          kkal * 0.1
        )} грам, яблоко - ${Math.floor(kkal * 0.1)} грам`,
        dinner: `Суп м'ясний або з фрикадельками - ${Math.floor(
          kkal * 0.2
        )} мл, овочевий салат - ${Math.floor(kkal * 0.15)} грам`,
        afternoonSnack: `Фруктова нарізка з бананів, апельсинів, яблук, ківі та йогурту - ${Math.floor(
          kkal * 0.15
        )} грам`,
        supper: `рибні котлети на пару -  ${Math.floor(
          kkal * 0.1
        )} грам, грецький салат - ${Math.floor(kkal * 0.1)} грам`,
      },
    },
    {
      name: 'Wednesday',
      day: startWeek.plus({ days: 2 }).toFormat('yyyy-MM-dd'),
      dayMenu: {
        breakfast: `мюслі на молоці - ${Math.floor(
          kkal * 0.1
        )} грам, варені яйця - ${Math.floor(
          kkal * 0.05
        )} грам, сок ( не концентрований ) - ${Math.floor(kkal * 0.1)} млгм`,
        secondBreakfast: `творог з млинцями - ${Math.floor(
          kkal * 0.1
        )} грам, молоко - ${Math.floor(kkal * 0.1)} мл`,
        dinner: `борщ - ${Math.floor(
          kkal * 0.2
        )} мл, плов з м'ясом - ${Math.floor(kkal * 0.1)} грам`,
        afternoonSnack: `Фруктова нарізка з бананів, апельсинів, яблук, ківі та йогурту - ${Math.floor(
          kkal * 0.15
        )} грам`,
        supper: `варена куряча грудка -  ${Math.floor(
          kkal * 0.1
        )} грам, овочевий салат - ${Math.floor(kkal * 0.1)} грам`,
      },
    },
    {
      name: 'Thursday',
      day: startWeek.plus({ days: 3 }).toFormat('yyyy-MM-dd'),
      dayMenu: {
        breakfast: `пшенична каша - ${Math.floor(
          kkal * 0.15
        )} грам, відварене куряче філе - ${Math.floor(
          kkal * 0.1
        )} грам, сок ( не концентрований ) - ${Math.floor(kkal * 0.1)} млгм`,
        secondBreakfast: `бутерброд з куркою - ${Math.floor(
          kkal * 0.1
        )} грам, молоко - ${Math.floor(kkal * 0.1)} мл`,
        dinner: `суп з спагетті - ${Math.floor(
          kkal * 0.15
        )} мл, гречана каша з грибами - ${Math.floor(
          kkal * 0.1
        )} грам, салат з овочами - ${Math.floor(kkal * 0.1)} грам `,
        afternoonSnack: `Фруктова нарізка з бананів, апельсинів, яблук, ківі та йогурту - ${Math.floor(
          kkal * 0.15
        )} грам`,
        supper: `тушені перці з м'ясним фаршем та капустою -  ${Math.floor(
          kkal * 0.1
        )} грам, сок ( не концентрований) - ${Math.floor(kkal * 0.1)} мл`,
      },
    },
    {
      name: 'Friday',
      day: startWeek.plus({ days: 4 }).toFormat('yyyy-MM-dd'),
      dayMenu: {
        breakfast: `запечена риба з сиром в духовці- ${Math.floor(
          kkal * 0.1
        )} грам, рисова каша (готова) - ${Math.floor(
          kkal * 0.1
        )} грам, сок ( не концентрований ) - ${Math.floor(kkal * 0.1)} мл`,
        secondBreakfast: `запіканка творожна - ${Math.floor(
          kkal * 0.1
        )} грам, молоко - ${Math.floor(kkal * 0.1)} мл`,
        dinner: `уха - ${Math.floor(
          kkal * 0.15
        )} грам, куряча відбивна - ${Math.floor(
          kkal * 0.05
        )} грам, салат з овочами - ${Math.floor(kkal * 0.1)} грам `,
        afternoonSnack: `Фруктова нарізка з бананів, апельсинів, яблук, ківі та йогурту - ${Math.floor(
          kkal * 0.15
        )} грам`,
        supper: `картопляне пюре -  ${Math.floor(
          kkal * 0.1
        )} грам, рибна котлета -  ${Math.floor(
          kkal * 0.1
        )} грам, овочевий салат -  ${Math.floor(
          kkal * 0.1
        )} грам, сок ( не концентрований) - ${Math.floor(kkal * 0.1)} мл`,
      },
    },
    {
      name: 'Saturday',
      day: startWeek.plus({ days: 5 }).toFormat('yyyy-MM-dd'),
      dayMenu: {
        breakfast: `печеня з сиром в горшечку - ${Math.floor(
          kkal * 0.1
        )} грам, яблоко - ${Math.floor(kkal * 0.1)} грам`,
        secondBreakfast: `пиріг з мясом - ${Math.floor(
          kkal * 0.1
        )} грам, кефір - ${Math.floor(kkal * 0.1)} мл`,
        dinner: `гороховий суп з м'ясом - ${Math.floor(
          kkal * 0.15
        )} грам, картопля в мундирі - ${Math.floor(
          kkal * 0.1
        )} грам, тушені овочі - ${Math.floor(kkal * 0.1)} грам `,
        afternoonSnack: `цвітна капуста в клярі - ${Math.floor(
          kkal * 0.1
        )} грам, молоко - ${Math.floor(kkal * 0.1)} мл `,
        supper: `куряча грудка відварена -  ${Math.floor(
          kkal * 0.1
        )} грам, сок ( не концентрований) - ${Math.floor(kkal * 0.1)} мл`,
      },
    },
    {
      name: 'Sunday',
      day: startWeek.plus({ days: 6 }).toFormat('yyyy-MM-dd'),
      dayMenu: {
        breakfast: `омлет - ${Math.floor(
          kkal * 0.1
        )} грам, банан - ${Math.floor(
          kkal * 0.05
        )} грам, сок ( не концентрований) - ${Math.floor(kkal * 0.1)} мл`,
        secondBreakfast: `отбівна куряча - ${Math.floor(
          kkal * 0.05
        )} грам, морська капуста - ${Math.floor(kkal * 0.1)} грам`,
        dinner: `сирний суп з грибами - ${Math.floor(
          kkal * 0.15
        )} грам, відварена куряча грудка - ${Math.floor(
          kkal * 0.1
        )} грам, овочевий салат - ${Math.floor(kkal * 0.15)} грам `,
        afternoonSnack: `оладки з кабачків - ${Math.floor(
          kkal * 0.1
        )} грам, горячий бутерброд з сиром - ${Math.floor(
          kkal * 0.05
        )} грам, молоко - ${Math.floor(kkal * 0.1)} мл, `,
        supper: `запечена риба з овочами -  ${Math.floor(
          kkal * 0.1
        )} грам, сок ( не концентрований) - ${Math.floor(kkal * 0.1)} мл`,
      },
    },
  ];
  return uploadedMenu;
}

function countWater(body) {
  let liters = 0;
  body.targetWeekTime = Number(body.targetWeekTime);
  if (body.gender === 'male') {
    liters = body.weight * 0.03 + body.targetWeekTime * 0.3;
  }
  if (body.gender === 'female') {
    liters = body.weight * 0.025 + body.targetWeekTime * 0.3;
  }
  return liters;
}
module.exports = {
  countWater,
  kkalCalc,
  trainingCalc2,
  trainingCalc3,
  trainingCalc4,
  trainingCalc5,
  userTrainingUpdate,
  uploadedTrainingFunc,
  getUserWeekMenu,
};
