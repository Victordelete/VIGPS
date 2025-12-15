import React from 'react';
import { Text, View } from 'react-native';
import AppNavigator  from './src/navigation/AppNavigator'
import { ensureDatabaseExists }  from  './src/database/db'

export default function App() {
  ensureDatabaseExists();
  return (
    <AppNavigator />
  );
}