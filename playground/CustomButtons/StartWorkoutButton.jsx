import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function StartWorkoutButton({ startWorkout }) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={startWorkout}>
      <View style={styles.startWorkout}>
        <Text style={styles.text}>Start Workout</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  startWorkout: {
    backgroundColor: "dodgerblue",
    width: 300,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderWidth: 10,
    borderRadius: 100,
    borderColor: "dodgerblue",
  },
  text: {
    color: "#fff",
  },
});
