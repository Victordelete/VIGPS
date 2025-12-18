import { useState, useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function SaveGps() {
  const [tracking, setTracking] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [locations, addLocation] = useState([]);
  const locationSubscription = useRef(null);

  async function startTracking() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permissão de GPS negada");
      return;
    }

    locationSubscription.current =
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 2000, // 2 seconds
          distanceInterval: 0,
        },
        (location) => {
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            altitude: location.coords.altitude,
            accuracy: location.coords.accuracy,
            timestamp: location.timestamp,
          };
          addLocation([...locations, coords]);
          setLastLocation(coords);
        }
      );

    setTracking(true);
  }

  function stopTracking() {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
    console.log(locations);
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
