import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const BUTTONS = [
  { label: "Culture", color: "#FFA500" },       // Orange
  { label: "History", color: "#32CD32" },       // Green
  { label: "Leaders", color: "#8A2BE2" },       // Violet
  { label: "Quiz", color: "#1E90FF" },          // Dodger Blue
  { label: "Languages", color: "#FF1493" },     // Deep Pink
  { label: "Cuisine", color: "red" },       // Gold
];

export default function Menu() {
  return (
    <View style={styles.container}>
      {BUTTONS.map((btn, idx) => (
        <TouchableOpacity key={idx} style={[styles.button, { backgroundColor: btn.color }]}>
          <Ionicons name="calculator-outline" size={24} color="white" />
          <Text style={styles.buttonText}>{btn.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 4,
    gap: 2,
    marginTop:30
  },
  button: {
    width: Dimensions.get("window").width / 2 - 16,
    height: 120,
    margin: 2,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    marginTop: 6,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
