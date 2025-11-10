import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>victorhugomarques</Text>
      <Image 
        style={{
          width: 40,
          height: 40,
        }}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/9972/9972672.png'
        }} 
      />

      <View>
        <SimpleLineIcons name="like" size={24} color="black" />
      </View>

      <Image 
        style={{
          width: '80%',
          height: '80%',
        }}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/9972/9972672.png'
        }} 
      />

      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
