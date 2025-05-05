import AsyncStorage from "@react-native-async-storage/async-storage";
import { Question } from "../types";

export const saveScore = async (score: number) => {
  try {
    await AsyncStorage.setItem("@lastScore", score.toString());
  } catch (e) {
    console.log("Failed to save score", e);
  }
};

export const handleStart = (setCurrentIndex: (n: number) => void) => {
 setCurrentIndex(0);
};


export const handleNext = (
 option: string | null,
 currentIndex: number,
 setCurrentIndex: (n: number) => void,
 score: number,
 setScore: (n: number) => void,
 setShowResult: (v: boolean) => void,
 saveScore: (s: number) => void,
 questions: Question[]
) => {
 const currentQuestion = questions[currentIndex];
 if (!currentQuestion) return;

 if (option && option === currentQuestion.answer) {
   setScore(score + 1);
 }

 const nextIndex = currentIndex + 1;
 if (nextIndex < questions.length) {
   setCurrentIndex(nextIndex);
 } else {
   setShowResult(true);
   saveScore(option === currentQuestion.answer ? score + 1 : score);
 }
};
