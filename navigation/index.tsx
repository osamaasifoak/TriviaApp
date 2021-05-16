/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

import NotFoundScreen from '../screens/NotFoundScreen';
import QuizScreen from '../screens/quiz/QuizScreen';
import SelectQuizTypeScreen from '../screens/quiz/SelectQuizType';
import ScoreboardScreen from '../screens/scoreboard/ScoreboardScreen';
import SplashScreen from '../screens/SplashScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { isReadyRef, navigationRef } from './RootNavigation';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
				isReadyRef.current = true;
			}}
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ROOT" component={SplashScreen} />
      <Stack.Screen name="HOME" component={HomeScreen} />
      <Stack.Screen name="SELECT_QUIZ_TYPE" component={SelectQuizTypeScreen} />
      <Stack.Screen name="QUIZ" component={QuizScreen} />
      <Stack.Screen name="SCOREBOARD" component={ScoreboardScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
