import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.touchableContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('RecordScreen')} style={styles.item}>
          <Text style={styles.text}>Novo Video</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('VideosScreen')} >
          <Text style={styles.text}>Videos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('SaveGps')} >
          <Text style={styles.text}>Salvar GPS</Text>
        </TouchableOpacity>
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
  touchableContainer: {
    height: '60%',
    width: '80%',
    gap: 20,
  },
  item: {
    height: 60,
    backgroundColor: '#0fca63fa',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignContent: 'center',
    fontSize: 25,
    color: '#fffffffa',
    fontWeight: 'bold',
  }
});
