import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RecordScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>RecordScreen</Text>
            {/* <Button
                title="Ir para HomeScreen"
                onPress={() => navigation.navigate('HomeScreen')}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});
