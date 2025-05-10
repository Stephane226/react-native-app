import React from "react";
import { NavigationContainer,View } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import Settings from "./screens/settings";
import Map from "./screens/map";
import Quiz from './screens/quiz'
import Country from './screens/country'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: "none",
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Quiz" component={Quiz} /> 
        <Stack.Screen name="Country" component={Country} /> 

        
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}
