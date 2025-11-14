import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Inicial</Text>
      <View style={styles.buttonsContainer}>
        <Button 
            title="Gravar video"
            onPress={() => navigation.navigate('RecordScreen')}
        />
        <Button style={styles.item}
            title="Videos"
            onPress={() => navigation.navigate('VideosScreen')}
        />
        <Button
            title="Configurações"
            onPress={() => navigation.navigate('SettingsScreen')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    gap: 50,
  },
  buttonsContainer: {
    width: '70%',
    gap: 20,
  }
});
