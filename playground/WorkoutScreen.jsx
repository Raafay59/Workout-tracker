import { View, Text, Button, Alert, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import ExerciseTable from "./ExerciseTable";
import newWorkoutContext from "./newWorkoutContext";

export default function WorkoutScreen() {
  const [exercises, setExercises] = useState([]);
  const [newWorkout, setNewWorkout] = useContext(newWorkoutContext);
  return (
    <ScrollView>
      {exercises.map((exercise) => (
        <ExerciseTable exerciseName={exercise} key={exercise}></ExerciseTable>
      ))}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Add Exercise"
          onPress={() =>
            Alert.prompt("Enter exercise name", undefined, (text) => {
              if (exercises.includes(text.toUpperCase().trim())) {
                alert("This exercise is already in this workout");
              } else {
                setExercises([...exercises, text.toUpperCase().trim()]);
                setNewWorkout((newWorkout) => {
                  let newWorkoutCopy = { ...newWorkout };
                  newWorkoutCopy[text.toUpperCase().trim()] = [[]];
                  return newWorkoutCopy;
                });
              }
            })
          }
          color={"red"}
        />
      </View>
    </ScrollView>
  );
}
