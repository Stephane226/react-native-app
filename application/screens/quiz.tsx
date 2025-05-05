import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ViewStyle } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";

// importing quiz JSON
import questions from "../includes/questions.json";

// immport functions
import { handleStart, handleNext , saveScore} from "../utils/quizHandlers";

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
    if (currentIndex === -1) return;

    setQuestionTimer(QUESTION_TIME);

    questionInterval.current = setInterval(() => {
      setQuestionTimer((prev) => {
        if (prev <= 1) {
          clearInterval(questionInterval.current!);
          handleNext(null);
          return QUESTION_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (questionInterval.current) clearInterval(questionInterval.current);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === -1) return;

    quizInterval.current = setInterval(() => {
      setQuizTimer((prev) => {
        if (prev <= 1) {
          clearInterval(quizInterval.current!);
          setShowResult(true);
          saveScore(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (quizInterval.current) clearInterval(quizInterval.current);
    };
  }, [currentIndex]);

  if (currentIndex === -1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Quiz!</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleStart(setCurrentIndex)}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Your Score: {score}/{questions.length}
        </Text>
      </View>
    );
  }

  const currentQuestion: Question = questions[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        ⏱ Q: {questionTimer}s | 🧮 Total: {quizTimer}s
      </Text>
      <Text style={styles.progress}>
        Question {currentIndex + 1} / {questions.length}
      </Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((opt, idx) => (
        <TouchableOpacity key={idx} style={styles.option} 
        onPress={() => handleNext(
         opt,
         currentIndex,
         setCurrentIndex,
         score,
         setScore,
         setShowResult,
         saveScore,
         questions
       )}
       
       >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
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
