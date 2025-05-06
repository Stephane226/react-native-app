import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ViewStyle,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";

// importing quiz JSON
import questions from "../includes/questions.json";

// immport functions
import { handleStart, handleNext, saveScore } from "../utils/quizHandlers";

export default function Quiz() {
  const QUESTION_TIME = 300;
  const TOTAL_TIME = 900;

  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [score, setScore] = useState<number>(0);
  const [questionTimer, setQuestionTimer] = useState<number>(QUESTION_TIME);
  const [quizTimer, setQuizTimer] = useState<number>(TOTAL_TIME);
  const [showResult, setShowResult] = useState<boolean>(false);

  const questionInterval = useRef<NodeJS.Timeout | null>(null);
  const quizInterval = useRef<NodeJS.Timeout | null>(null);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));

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


  useEffect(() => {
   setSelectedOption(answers[currentIndex]);
 }, [currentIndex]);

 
  if (currentIndex === -1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Quiz!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleStart(setCurrentIndex)}
        >
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

     <View style={styles.questionsList}>
      {currentQuestion.options.map((opt, idx) => (
      <TouchableOpacity
      key={idx}
      style={[
        styles.option,
        selectedOption === opt && { borderColor: "#007AFF", borderWidth: 2 },
      ]}
      disabled={answers[currentIndex] !== null}
      onPress={() => setSelectedOption(opt)}
    >
      <View
       style={{
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center'
       }}
      >
      <View style={[styles.optionSelect, selectedOption === opt && { backgroundColor: "blue" }]}>
        <Text  style={[styles.optionSelectNum, , selectedOption === opt &&  {color:'white'  }]}> A </Text>
      </View>

      <Text style={[styles.optionText, answers[currentIndex] !== null && { color: "gray" }]}>
        {opt}
      </Text>
      </View>

    </TouchableOpacity>
   
    
      ))}
      </View>





      <View
        style={{
      
          marginTop: 20,
         
          paddingTop : 16,
          position:'absolute',
          bottom:40,
          width:'100%',

        }}
      >

        
      <View 
        style={{
          flexDirection: "row",
        }} >
      {[...Array(40)].map((_, i) => (
        <View key={i} style={styles.dash} />
      ))} 
      </View>



      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
           alignItems:'center',
          width:'100%',
          marginTop:15,
          paddingHorizontal:15
        
        
        }}
      >
       <View>
       <TouchableOpacity
          style={styles.indexQuest}     
        >
          <Text style={styles.indexQuestText}> Question {currentIndex + 1} of {questions.length}^</Text>
        </TouchableOpacity>
        </View>


        

      <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width:'30%',
            paddingHorizontal:15
          
          
          }}
      >
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && { opacity: 0.5 }]}
          disabled={currentIndex === 0}
          onPress={() => {
            setCurrentIndex(currentIndex - 1);
            setSelectedOption(null);
          }}
        >
          <Text style={styles.navButtonText}>◀ </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, {marginLeft:10}]}
          onPress={() => {
           const updatedAnswers = [...answers];
           updatedAnswers[currentIndex] = selectedOption;
           setAnswers(updatedAnswers);
         
           handleNext(
             selectedOption,
             currentIndex,
             setCurrentIndex,
             score,
             setScore,
             setShowResult,
             saveScore,
             questions
           );
         
           setSelectedOption(null);
         }}
         
        >
          <Text style={styles.navButtonText}> ▶</Text>
        </TouchableOpacity>

        </View>
        
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
 
    backgroundColor: "#fff",
  },
  indexQuest:{
    backgroundColor:'black',
    padding:12,
    borderRadius:7
  },
  indexQuestText:{color:'white',
    fontSize:16

  },

  optionSelect:{
    borderColor:'gray',
    width:30,
    height:30,
    borderWidth : 2,
    borderRadius:20,
    textAlign:'center',
     alignItems:'center',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    marginRight : 10

  },

  optionSelectNum :{
    fontSize : 18
  },
  dash: {
    height: 4,
    width: 8,
    backgroundColor: 'grey',
    marginRight: 3,
  },

  questionsList:{
    padding:14
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
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

  navButton: {
    backgroundColor: "#007AFF",
    borderColor:'blueviolet',
    borderWidth:1,

    borderRadius: 90,
    width: 56,
    height:56,
    display:'flex',
    alignItems:'center',
    flexDirection:"column",
    justifyContent:'center',
    alignItems: "center",
  },
  navButtonText: {
    color: "white",
    fontSize: 16,
  },
});
