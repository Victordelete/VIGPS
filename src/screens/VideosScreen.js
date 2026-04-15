import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { getVideos, getPositionByVideo, deleteVideoById } from "../database/db";
import { FontAwesome5 } from "@expo/vector-icons";
import { saveCSV } from "../services/save_csv.js";

export default function VideosScreen({ navigation }) {

  const [videos, setVideos] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

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

  async function saveFilePositions(video) {
    try {
      const positions = await getPositionByVideo(video.id);
      const filePath = saveCSV(positions, video.name);
      console.log(filePath);
    } catch (error) {
      console.error('Erro de SQLite:', error);
    }
  }

  async function openMap(video) {
    try {
      const positions = await getPositionByVideo(video.id);
      navigation.navigate('PositionsMap', { positions });
    } catch (error) {
      console.error('Erro ao carregar posições:', error);
    }
  }

  function confirmDelete(video) {
    setVideoToDelete(video);
    setDeleteModalVisible(true);
  }

  async function deleteVideo() {
    if (!videoToDelete) return;
    try {
      deleteVideoById(videoToDelete.id);
      loadVideos();
    } catch (error) {
      console.error('Erro de SQLite:', error);
    } finally {
      setDeleteModalVisible(false);
      setVideoToDelete(null);
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{item.record_date}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={() => confirmDelete(item)}
            style={styles.actionButton}>
            <FontAwesome5 name="trash" size={20} color="#0a84ff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => saveFilePositions(item)}
            style={styles.actionButton}>
            <FontAwesome5 name="download" size={20} color="#0a84ff" />
          </TouchableOpacity>

          {/* Novo botão de mapa */}
          <TouchableOpacity
            onPress={() => openMap(item)}
            style={styles.actionButton}>
            <FontAwesome5 name="map-marked-alt" size={20} color="#0a84ff" />
          </TouchableOpacity>
        </View>
      </View>
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

      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            <View style={styles.iconCircle}>
              <FontAwesome5 name="trash" size={28} color="#A32D2D" />
            </View>
            <Text style={styles.modalTitle}>Excluir vídeo?</Text>
            <Text style={styles.modalMessage}>
              Esta ação é permanente e não pode ser desfeita. O vídeo será removido definitivamente.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={deleteVideo}
              >
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    borderColor: '#acacac'
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
    shadowRadius: 4,
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    marginTop: 6,
    fontSize: 10,
    color: "#555",
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    marginRight: 15,
    marginTop: -15,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FCEBEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 14,
    color: '#333',
  },
  deleteBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#A32D2D',
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F7C1C1',
  },
});