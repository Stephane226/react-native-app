import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ViewStyle,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";

// importing quiz JSON
import questions from "../includes/questions.json";

// immport functions
import { handleStart, handleNext, saveScore } from "../utils/quizHandlers";

//icons
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";

import Menu from '../components/menu'
import Carousel from '../components/carousel'

export default function Quiz() {

 return(
   <View style={{
    paddingTop:50
   }}>
   <Carousel/>
   <Menu/>
   </View>
 )
}
