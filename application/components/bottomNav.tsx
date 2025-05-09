import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons, Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function BottomNav() {
  return (
    <View style={styles.menuContainer}>
      {/* Left Icons */}
      <TouchableOpacity style={styles.iconButton}>
        <Feather name="search" size={22} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <FontAwesome name="user-o" size={22} color="#333" />
      </TouchableOpacity>

      {/* Center Home Icon */}
      <TouchableOpacity style={styles.homeButton}>
        <Ionicons name="home" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Right Icons */}
      <TouchableOpacity style={styles.iconButton}>
        <MaterialIcons name="favorite-border" size={22} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <Feather name="settings" size={22} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
   position:'absolute',
    bottom: 30,
    width: width - 32,
    marginHorizontal: 16,
    paddingVertical: 9,
    backgroundColor: "#ffffffee",
    borderRadius: 40,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  iconButton: {
    padding: 4,
    borderRadius: 30,
  },
  homeButton: {
    backgroundColor: "#1E90FF",
    padding: 8,
    borderRadius: 50,
    marginHorizontal: 3,
    elevation: 6,
  },
});
