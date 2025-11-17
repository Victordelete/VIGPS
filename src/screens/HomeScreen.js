import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/home_image.jpg')}
        style={styles.image}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>VIGPS</Text>
        </View>
      </ImageBackground>

      <View style={styles.touchableContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LandingScreen')}
          style={styles.item}>
          <Text style={styles.text}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#e4f8edd8',
  },
  touchableContainer: {
    height: '20%',
    width: '80%',
    gap: 20,
  },
  item: {
    height: 60,
    backgroundColor: '#0cd42dfa',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  text: {
    alignContent: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fffffffa',
  },
  titleContainer: {
    paddingVertical: 50,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  title: {
    color: '#0320a0ff',
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  image: {
    width: '100%',
    height: '100%',
    borderEndEndRadius: '23%',
    gap: 20,
    borderColor: '#1c4729d0',
    borderWidth: 3,
    justifyContent: 'center',
    overflow: 'hidden',
  }
});
