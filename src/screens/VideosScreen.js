import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { getAllUsers } from "../database/queries";

// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { getAllUsers } from "../database/queries";

export default function VideosScreen({ navigation }) {

  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   load();
  // }, []);

  // async function load() {
  //   const data = await getAllUsers();
  //   setUsers(data);
  //   console.log(data);
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VideosScreen Inicial</Text>
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
