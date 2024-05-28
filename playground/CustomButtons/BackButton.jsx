import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";

export default function BackButton({ exit }) {
  const [loading, setLoading] = useState(true);
  return (
    <View style={{ marginLeft: 20 }}>
      {loading && <ActivityIndicator />}
      <TouchableOpacity onPress={exit}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require("C:/Users/raafa/OneDrive/Desktop/React Native Apps/Playground/playground/assets/backButton.png")}
          onLoadEnd={() => setLoading(false)}
        />
      </TouchableOpacity>
    </View>
  );
}
