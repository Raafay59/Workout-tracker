import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState, useContext } from "react";
import newWorkoutContext from "./newWorkoutContext";

export default function ExerciseRow({ setNumber, exerciseName }) {
  const [newWorkout, setNewWorkout] = useContext(newWorkoutContext);
  return (
    <View style={styles.rowContainer}>
      <View style={styles.tableCell}>
        <Text>{setNumber}</Text>
      </View>
      <View style={styles.inputCell}>
        <TextInput
          style={{ textAlign: "center" }}
          keyboardType="numeric"
          onChangeText={(weight) => {
            if (!Array.isArray(newWorkout[exerciseName][setNumber - 1])) {
              setNewWorkout((newWorkout) => {
                let newWorkoutCopy = { ...newWorkout };
                newWorkoutCopy[exerciseName][setNumber - 1] = [];
                return newWorkoutCopy;
              });
            }
            setNewWorkout(() => {
              let newWorkoutCopy = { ...newWorkout };
              newWorkoutCopy[exerciseName][setNumber - 1][0] = Number(weight);
              return newWorkoutCopy;
            });
          }}
        ></TextInput>
      </View>
      <View style={styles.inputCell}>
        <TextInput
          style={{ textAlign: "center" }}
          keyboardType="numeric"
          onChangeText={(reps) => {
            if (!Array.isArray(newWorkout[exerciseName][setNumber - 1])) {
              setNewWorkout((newWorkout) => {
                let newWorkoutCopy = { ...newWorkout };
                newWorkoutCopy[exerciseName][setNumber - 1] = [];
                return newWorkoutCopy;
              });
            }
            setNewWorkout(() => {
              let newWorkoutCopy = { ...newWorkout };
              newWorkoutCopy[exerciseName][setNumber - 1][1] = Number(reps);
              return newWorkoutCopy;
            });
          }}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    margin: 10,
  },
  inputCell: {
    flex: 1,
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 20,
  },
  tableCell: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
  },
});
