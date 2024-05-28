import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React, { Component } from "react";

export default function ViewStatsButton({ viewStats }) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={viewStats}>
      <View style={styles.viewStats}>
        <Text style={styles.text}>View Stats</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
