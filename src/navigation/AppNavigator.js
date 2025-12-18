import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';
import VideosScreen from '../screens/VideosScreen';
import LandingScreen from '../screens/LandingScreen';
import SaveGps from '../screens/SaveGps'

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: '', headerShown: false}} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ title: ''}} />
        <Stack.Screen name="RecordScreen" component={RecordScreen} options={{ title: ''}} />
        <Stack.Screen name="VideosScreen" component={VideosScreen} options={{ title: ''}} />
        <Stack.Screen name="SaveGps" component={SaveGps} options={{ title: ''}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}