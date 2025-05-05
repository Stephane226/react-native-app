import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ViewStyle } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";

// importing quiz JSON
import questions from "../includes/questions.json";

// Define question type
type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

export default function Quiz() {
  const QUESTION_TIME = 30;
  const TOTAL_TIME = 90;

  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [score, setScore] = useState<number>(0);
  const [questionTimer, setQuestionTimer] = useState<number>(QUESTION_TIME);
  const [quizTimer, setQuizTimer] = useState<number>(TOTAL_TIME);
  const [showResult, setShowResult] = useState<boolean>(false);

  const questionInterval = useRef<NodeJS.Timeout | null>(null);
  const quizInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  useEffect(() => {
 
  }, [currentIndex]);




  if (currentIndex === -1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Quiz!</Text>
        <TouchableOpacity style={styles.button} onPress={null}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Your Score: 7287382
        </Text>
      </View>
    );
  }

  const currentQuestion: Question = questions[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        ⏱ Q: s | 🧮 Total: timer/s
      </Text>
      <Text style={styles.progress}>
        Question index here / number
      </Text>
      <Text style={styles.question}> question here...</Text>



    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 10 },
  buttonText: { color: "white", fontSize: 18, textAlign: "center" },
  question: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  option: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  optionText: { fontSize: 16, textAlign: "center" },
  progress: { fontSize: 16, marginBottom: 10, textAlign: "center" },
  timer: { fontSize: 14, marginBottom: 10, textAlign: "center", color: "#888" },
});
