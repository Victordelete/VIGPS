import { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { File, Paths } from 'expo-file-system';
import GpsTracker from "../services/GpsTracker"

export default function SaveGps() {
  const [tracking, setTracking] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [locations, addLocation] = useState([]);
  const locationSubscription = useRef(null);
  const [permissionGps, setPermissionGps] = useState(null);
    useEffect(() => {
      (async () => {
        const { status } =
          await Location.requestForegroundPermissionsAsync();
        setPermissionGps(status === "granted");
      })();
    }, []);

  if (!permissionGps) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necessário permissão para acessar GPS.</Text>
      </View>
    );
  }

  function objectToCSV(data) {
    if (!data || !data.length) return "";

    const headers = Object.keys(data[0]).join(",");

    const rows = data.map(item =>
      Object.values(item)
        .map(value => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    );

    return [headers, ...rows].join("\n");
  }

  async function saveCSV(csv) {
    try {
      const fileUri = `gps_${Date.now()}.csv`;

      const file = new File(Paths.cache, fileUri);
      file.create();
      file.write(csv);


      console.log("CSV salvo em:", fileUri);

      return fileUri;
    } catch (err) {
      console.error("Erro ao salvar CSV:", err);
    }
  }

  async function startTracking() {
    GpsTracker.startTracking();
    setTracking(true);
  }

  async function stopTracking() {
    const positions = GpsTracker.stopTracking();
    const positions_csv = objectToCSV(positions);
    const file_name = await saveCSV(positions_csv);
    console.log(file_name);
    setTracking(false);
  }

  function toggleTracking() {
    if (tracking) {
      stopTracking();
    } else {
      startTracking();
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title={tracking ? "Parar GPS" : "Iniciar GPS"}
        onPress={toggleTracking}
      />

      {lastLocation && (
        <Text style={styles.text}>
          Lat: {lastLocation.latitude}{"\n"}
          Lng: {lastLocation.longitude}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    borderRadius: 35,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
});
