import { StyleSheet, View, Text, Button } from "react-native";
import React, { useState, useContext } from "react";
import ExerciseRow from "./ExerciseRow";
import newWorkoutContext from "./newWorkoutContext";

export default function ExerciseTable({ exerciseName }) {
  const [sets, setSets] = useState([1]);
  const newWorkout = useContext(newWorkoutContext);
  return (
    <>
      <View style={styles.exerciseNameContainer}>
        <Text>{exerciseName}</Text>
      </View>
      <View style={styles.tableHeader}>
        <View style={styles.tableCell}>
          <Text>Set</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>Weight</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>Reps</Text>
        </View>
      </View>
      {sets.map((setNumber) => (
        <ExerciseRow
          setNumber={setNumber}
          key={exerciseName + setNumber}
          exerciseName={exerciseName}
        ></ExerciseRow>
      ))}
      <Button
        title="Add Set"
        onPress={() => {
          setSets([...sets, sets.length + 1]);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  exerciseNameContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  tableCell: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
  },
});
