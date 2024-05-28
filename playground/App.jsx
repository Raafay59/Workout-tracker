import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import StartWorkoutButton from "./CustomButtons/StartWorkoutButton";
import ViewStatsButton from "./CustomButtons/ViewStatsButton";
import BackButton from "./CustomButtons/BackButton";
import WorkoutScreen from "./WorkoutScreen";
import newWorkoutContext from "./newWorkoutContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};

const storeMaster = async (master) => {
  try {
    const jsonValue = JSON.stringify(master);
    await AsyncStorage.setItem("master", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getMaster = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("master");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const storePrevious = async (previous) => {
  try {
    const jsonValue = JSON.stringify(previous);
    await AsyncStorage.setItem("previous", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getPrevious = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("previous");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export default function App() {
  const [screen, setScreen] = useState(1);
  const [example, setExample] = useState();
  const [master, setMaster] = useState({});
  const [newWorkout, setNewWorkout] = useState({});
  const [statDisplay, setStatDisplay] = useState("");
  //Start workout or view stats screen
  if (screen === 1) {
    return (
      <newWorkoutContext.Provider value={newWorkout}>
        <View style={styles.bkg}>
          <Button title="clear storage" onPress={clearAsyncStorage}></Button>
          <StartWorkoutButton
            startWorkout={() => {
              setScreen(2);
              setNewWorkout({});
            }}
          ></StartWorkoutButton>
          <ViewStatsButton
            viewStats={() => {
              getMaster().then((value) =>
                setStatDisplay(JSON.stringify(value, null, 2))
              );
              setScreen(3);
            }}
          ></ViewStatsButton>
        </View>
      </newWorkoutContext.Provider>
    );
  }

  //Workout screen
  if (screen === 2) {
    return (
      <newWorkoutContext.Provider value={[newWorkout, setNewWorkout]}>
        <SafeAreaView style={{ alignItems: "baseline" }}>
          <BackButton
            exit={() => {
              Alert.alert(
                "Cancel workout?",
                "Data will not be saved for this workout",
                [
                  {
                    text: "yes",
                    onPress: () => {
                      setScreen(1);
                      setNewWorkout({});
                    },
                  },
                  { text: "no" },
                ]
              );
            }}
          ></BackButton>
        </SafeAreaView>
        <WorkoutScreen></WorkoutScreen>
        <View style={{ marginBottom: 30 }}>
          <Button
            title="Finish Workout"
            color={"green"}
            onPress={() => {
              Alert.alert("Finish workout?", null, [
                {
                  text: "yes",
                  onPress: () => {
                    setScreen(1);
                    setMaster(makeNewMaster(master, newWorkout));
                    storeMaster(master);
                    storePrevious(newWorkout);
                    setNewWorkout({});
                  },
                },
                { text: "no" },
              ]);
            }}
          />
        </View>
      </newWorkoutContext.Provider>
    );
  }

  //Music stats screen
  if (screen === 3) {
    return (
      <newWorkoutContext.Provider value={newWorkout}>
        <SafeAreaView style={{ alignItems: "baseline" }}>
          <BackButton
            exit={() => {
              setScreen(1);
            }}
          ></BackButton>
        </SafeAreaView>
        <View style={styles.bkg}>
          <Text>{statDisplay}</Text>
        </View>
      </newWorkoutContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  bkg: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
