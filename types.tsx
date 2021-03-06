/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  ROOT: undefined;
  HOME: undefined;
  SELECT_QUIZ_TYPE: undefined;
  QUIZ: {
    numberOfQuestion: number,
    category?: string,
    difficulty?: string,
    type?: string
  };
  RESULT: {
    correctAnswer: any,
    incorrectAnswer: any,
    totalQuestion: any,
    totalTime: any,
    dateTime: any
  };
  SCOREBOARD: undefined;
  NotFound: undefined;
};


export type HomeScreenRouteProp = RouteProp<RootStackParamList, "HOME">;
export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HOME'>;
export type HomeProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

//////////////////////
export type SelectQuizTypeScreenRouteProp = RouteProp<RootStackParamList, 'SELECT_QUIZ_TYPE'>;
export type SelectQuizTypeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SELECT_QUIZ_TYPE'>;
export type SelectQuizTypeProps = {
  route: SelectQuizTypeScreenRouteProp;
  navigation: SelectQuizTypeScreenNavigationProp;
};
//////////////////////
export type QuizScreenRouteProp = RouteProp<RootStackParamList, 'QUIZ'>;
export type QuizScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'QUIZ'>;
export type QuizProps = {
  route: QuizScreenRouteProp;
  navigation: QuizScreenNavigationProp;
};
//////////////////////
export type ResultScreenRouteProp = RouteProp<RootStackParamList, 'RESULT'>;
export type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RESULT'>;
export type ResultProps = {
  route: ResultScreenRouteProp;
  navigation: ResultScreenNavigationProp;
};
//////////////////////
export type ScoreboardScreenRouteProp = RouteProp<RootStackParamList, 'SCOREBOARD'>;
export type ScoreboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SCOREBOARD'>;
export type ScoreboardProps = {
  route: ScoreboardScreenRouteProp;
  navigation: ScoreboardScreenNavigationProp;
};

//////////////////////
export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};
export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
