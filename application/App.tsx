import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ViewStyle } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";

//importing screens
import Quiz from './screens/quiz.tsx'
import Home from './screens/home.tsx'


export default function App() {


  return (
     <Home />
  );
}

