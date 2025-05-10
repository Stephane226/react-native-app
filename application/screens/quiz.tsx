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
import GeneralLayout from "../layouts/generalLayout";


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

export default function Quiz() {
  const QUESTION_TIME = 60;
  const TOTAL_TIME = 1000;

  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [score, setScore] = useState<number>(0);
  const [questionTimer, setQuestionTimer] = useState<number>(QUESTION_TIME);
  const [quizTimer, setQuizTimer] = useState<number>(TOTAL_TIME);
  const [showResult, setShowResult] = useState<boolean>(false);

  const questionInterval = useRef<NodeJS.Timeout | null>(null);
  const quizInterval = useRef<NodeJS.Timeout | null>(null);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showTimer, setShowTimer] = useState(true);

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

          const updatedAnswers = [...answers];
          updatedAnswers[currentIndex] = null;
          setAnswers(updatedAnswers);

          setSelectedOption(null);

          handleNext(
            null,
            currentIndex,
            setCurrentIndex,
            score,
            setScore,
            setShowResult,
            saveScore,
            questions
          );

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
    <GeneralLayout>
    <View style={styles.container}>
      <View
        style={{
          marginHorizontal: 15,
          marginBottom: 20,
          display: "none",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

        }}
      >
        <View style={{}}>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {" "}
            Patrie.BF
          </Text>
        </View>
    

 

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {showTimer && (
            <Text>
              ⏱{" "}
              {Math.floor(quizTimer / 60)
                .toString()
                .padStart(2, "0")}
              :{(quizTimer % 60).toString().padStart(2, "0")}
            </Text>
          )}

          <TouchableOpacity
            style={{
              marginLeft: 10,
              padding: 5,
              borderColor: "gray",
              borderWidth: 2,
              borderRadius: 14,
            }}
            onPress={() => setShowTimer(!showTimer)}
          >
            <Text style={{ fontSize: 15 }}>{showTimer ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={{
        marginHorizontal : 12,
        borderColor:'gray',
        borderWidth : 1,
        height:6,
        borderRadius : 20,
      }}>


      <View style={{
        
       backgroundColor : 'red',
       width: '40%',
       height:'100%',
       borderRadius : 20,
      }}></View>


      </View>



      <View
        style={{
          height: 45,
          marginHorizontal: 15,
          marginBottom: 20,
          display: "none", //was flex
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Ionicons name="calculator-outline" size={24} color="black" />
          <Text style={{ color: "gray" }}>Calculator</Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons name="math-compass" size={24} color="black" />
          <Text style={{ color: "gray" }}>Refereneator</Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Entypo name="dots-three-vertical" size={24} color="black" />
          <Text style={{ color: "gray" }}>More</Text>
        </View>
      </View>

   

      <View
        style={{
          height: 45,
          marginHorizontal: 15,
          marginBottom: 20,
          backgroundColor: "#ececec",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
          }}
        >
          {[...Array(33)].map((_, i) => (
            <View key={i} style={styles.dashTop} />
          ))}
        </View>

        <View
          style={{
            backgroundColor: "black",
            width: 25,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
            }}
          >
            1
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <Feather name="bookmark" size={24} color={"black"} />
          <Text style={{ fontSize: 17 }}> Mark for Review</Text>
        </View>

        <View
          style={{
            position: "absolute",
            right: 5,
            borderColor: "gray",
            borderWidth: 1,
            backgroundColor: "white",
            padding: 4,
            borderRadius: 8,
          }}
        >
          <Text>ABC</Text>
        </View>

        <Text style={styles.timer}>{questionTimer}s</Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 10,
          marginLeft: 12,
          marginRight: 12,
        }}
      >
        <Text style={styles.question}>{currentQuestion.question}</Text>

        <View
          style={{
            paddingHorizontal: 15,
            marginBottom: 20,
          }}
        >
          <Image
            source={{
              uri: "https://thestar.co.ke/wp-content/uploads/2025/05/ibrahim_traore_burkina-faso-leader-.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.questionsList}>
          {currentQuestion.options.map((opt, idx) => {
            const selected = answers[currentIndex];
            const isAnswered = selected !== null;
            const isSelected = selected === opt;
            const isCorrectAnswer = currentQuestion.answer === opt;
            const isUserCorrect = isAnswered && isSelected && isCorrectAnswer;
            const isUserWrong = isAnswered && isSelected && !isCorrectAnswer;

            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.option,
                  isAnswered &&
                    ((isSelected && isCorrectAnswer) || isCorrectAnswer) && {
                      borderColor: "green",
                      backgroundColor: "#f0f9ee",
                      borderWidth: 1,
                    },
                  isAnswered &&
                    isSelected &&
                    !isCorrectAnswer && {
                      borderColor: "red",
                      backgroundColor: "#fde9ea",
                      borderWidth: 1,
                    },
                ]}
                disabled={isAnswered}
                onPress={() => {
                  setSelectedOption(opt);
                  const newAnswers = [...answers];
                  newAnswers[currentIndex] = opt;
                  setAnswers(newAnswers);
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" ,justifyContent:'space-between' , display:'flex', width:'100%'}}>
                <View style={{
                  display:'flex',
                  flexDirection:'row',
                  alignItems : 'center'
                }}> 
                  <View
                    style={[
                      styles.optionSelect,
                      isAnswered &&
                        ((isSelected && isCorrectAnswer) ||
                          isCorrectAnswer) && {
                          backgroundColor: "green",
                        },
                      isAnswered &&
                        isSelected &&
                        !isCorrectAnswer && {
                          backgroundColor: "red",
                        },
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionSelectNum,
                        isAnswered &&
                          (isSelected || isCorrectAnswer) && {
                            color: "white",
                          },
                      ]}
                    >
                      A
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.optionText,
                      isAnswered &&
                        !isSelected &&
                        !isCorrectAnswer && { color: "gray" },
                    ]}
                  >
                    {opt}
                  </Text>
                  </View> 



                <View> 

                  {isAnswered &&
                    isSelected != isCorrectAnswer &&
                    isCorrectAnswer && (
                      <FontAwesome
                        name="check-circle"
                        size={18}
                        color="green"
                      />
                    )}

                  {isAnswered &&
                    isSelected &&
                    isSelected == isCorrectAnswer && (
                      <FontAwesome
                        name="check-circle"
                        size={18}
                        color="green"
                      />
                    )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <Octicons name="x-circle-fill" size={18} color="red" />
                  )}
                     </View>

                     
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View
        style={{
          marginTop: 20,

          paddingTop: 16,
          position: "absolute",
          bottom: 40,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {[...Array(40)].map((_, i) => (
            <View key={i} style={styles.dash} />
          ))}

          
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: 15,
            paddingHorizontal: 15,
          }}
        >
          <View>
            <TouchableOpacity style={styles.indexQuest}>
              <Text style={styles.indexQuestText}>
                {" "}
                Question {currentIndex + 1} of {questions.length}^
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "30%",

              paddingHorizontal: 15,
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
              style={[styles.navButton, { marginLeft: 5 }]}
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
    </GeneralLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: "top",
    backgroundColor: "#d9d9d947",
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 10,
  },
  indexQuest: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 7,
  },
  indexQuestText: { color: "white", fontSize: 14 },

  optionSelect: {
    borderColor: "gray",
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 20,
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: 10,
  },

  optionSelectNum: {
    fontSize: 14,
  },
  dash: {
    height: 1,
    width: 7,
    backgroundColor: "green",
    marginRight: 3,
  },

  dashTop: {
    height: 4,
    width: 8,
    backgroundColor: "#e1dbdb",
    marginRight: 3,
  },

  questionsList: {
    padding: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 30,
  },
  buttonText: { color: "white", fontSize: 18, textAlign: "center" },
  question: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "left",
    paddingHorizontal: 15,
  },
  option: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",

    alignItems: "space-between" ,
    display:'flex',
    flexDirection : 'row'


  },
  optionText: { fontSize: 14, textAlign: "center" },
  progress: { fontSize: 16, marginBottom: 10, textAlign: "center" },
  timer: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
    color: "black",
    backgroundColor: "#ffc3c3",
    width: 30,
    height: 30,
    borderRadius: 20,
    paddingTop: 8,
    position: "absolute",
    right: 50,
    top: 6,
  },

  navButton: {
    backgroundColor: "green",
    borderColor: "white",
    borderWidth: 1,

    borderRadius: 90,
    width: 45,
    height: 45,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    color: "yellow",
    fontSize: 16,
  },
});
