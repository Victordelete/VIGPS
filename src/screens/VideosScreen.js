import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getVideos } from "../database/db";
import { FontAwesome5 } from "@expo/vector-icons";

export default function VideosScreen({ navigation }) {

  const [videos, setVideos] = useState([]);
  const loadVideos = async () => {
    try {
      const videos = await getVideos();
      setVideos(videos);
    } catch (error) {
      console.error('Erro de SQLite:', error);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{item.record_date}</Text>
        <Text style={styles.date}>{item.is_s}</Text>
      </View>
      <TouchableOpacity
        onPress={() => console.log('Sincronizar item.')}
        style={{paddingTop: 12}}>
        <FontAwesome5 name="paper-plane" size={20} color="#0a84ff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Videos</Text>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  card2: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 7
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    marginTop: 6,
    fontSize: 10,
    color: "#555",
  }
});
