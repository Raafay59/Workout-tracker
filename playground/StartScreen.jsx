import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React, { Component } from "react";

export default class StartScreen extends Component {
  render() {
    return (
      <View style={styles.bkg}>
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.startWorkout}>
            <Text style={styles.text}>Start Workout</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.viewStats}>
            <Text style={styles.text}>View Stats</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  viewStats: {
    backgroundColor: "tomato",
    width: 300,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderWidth: 10,
    borderRadius: 100,
    borderColor: "tomato",
  },
  text: {
    color: "#fff",
  },
});
