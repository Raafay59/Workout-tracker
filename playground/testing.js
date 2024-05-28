function aBetterThanB(a, b) {
  if (a[0] > b[0]) {
    return true;
  } else if (a[0] === b[0]) {
    if (a[1] > b[1]) {
      return true;
    }
  } else {
    return false;
  }
}

function bestSet(workout) {
  let bestSet = workout[0];
  for (let i = 1; i < workout.length; i++) {
    if (aBetterThanB(workout[i], bestSet)) {
      bestSet = workout[i];
    }
  }
  return bestSet;
}

function makeNewMaster(master, newInfo) {
  //Master should be in the format {Workout: [Best weight, best reps], Workout2:[...]}
  //newInfo should be in the format {"BENCH": [[135, 5], [225, 7]], "DILLY DALLYING": [[1000, 300]]}

  //for each exercise in newInfo
  for (const exercise in newInfo) {
    //If it's not already in the master, add the best set of that exercise to the master
    if (!(exercise in master)) {
      master[exercise] = bestSet(newInfo[exercise]);
    }
    //If it is in the master, compare the best new set to the master set
    //If the new set is better, replace the old master set with the new master set
    else {
      if (aBetterThanB(bestSet(newInfo[exercise]), master[exercise])) {
        master[exercise] = bestSet(newInfo[exercise]);
      }
    }
  }
  return master;
}

const master = {
  BENCH: [185, 6],
  "PULL UPS": [0, 20],
  DIPS: [135, 7],
};

const newWorkout = {
  BENCH: [
    [135, 6],
    [185, 7],
  ],
  "PULL UPS": [
    [0, 1],
    [1, 1],
  ],
  DIPS: [
    [0, 75],
    [135, 6],
  ],
  DEADLIFT: [[0, 2]],
};

console.log(JSON.stringify(makeNewMaster(master, newWorkout), null, 2));
