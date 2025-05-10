import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";


const BUTTONS = [
  { label: "Culture", color: "#FFA500" , route : "Quiz" },       // Orange
  { label: "History", color: "#32CD32" , route :  "Quiz" },       // Green
  { label: "Leaders", color: "#8A2BE2" , route :  "Quiz" },       // Violet
  { label: "Quiz", color: "#1E90FF" ,  route : "Quiz"},          // Dodger Blue
  { label: "Languages", color: "#FF1493" ,  route : "Quiz"},     // Deep Pink
  { label: "Cuisine", color: "red" ,  route :  "Quiz"},       // Gold
];

export default function Menu() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {BUTTONS.map((btn, idx) => (
        <TouchableOpacity key={idx} style={[styles.button, { backgroundColor: btn.color }]} 
          onPress={() => navigation.navigate(btn.route)}
        >
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
    marginTop:10,
    marginBottom:50
  },
  button: {
    width: Dimensions.get("window").width / 3 - 10,
    height: 100,
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
