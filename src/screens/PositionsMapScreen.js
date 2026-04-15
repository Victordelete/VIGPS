import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function PositionsMapScreen({ route }) {
  const { positions } = route.params;

  if (!positions || positions.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Nenhuma posição encontrada.</Text>
      </View>
    );
  }

  const coordinates = positions.map(p => ({
    latitude: p.latitude,
    longitude: p.longitude,
  }));

  // Centraliza o mapa na primeira posição
  const initialRegion = {
    latitude: coordinates[0].latitude,
    longitude: coordinates[0].longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <MapView style={styles.map} initialRegion={initialRegion}>
      {/* Linha conectando os pontos */}
      <Polyline
        coordinates={coordinates}
        strokeColor="#0a84ff"
        strokeWidth={3}
      />

      {/* Marcador inicial */}
      <Marker
        coordinate={coordinates[0]}
        title="Início"
        pinColor="green"
      />

      {/* Marcador final */}
      <Marker
        coordinate={coordinates[coordinates.length - 1]}
        title="Fim"
        pinColor="red"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
  },
});