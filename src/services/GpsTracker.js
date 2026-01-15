import * as Location from "expo-location";


class GpsTracker {
  locationSubscription = null;
  lastLocation = null;
  positions = [];

  async startTracking() {
    this.positions = [];
    this.locationSubscription =
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 0.5*1000, // seconds
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
          this.positions = [...this.positions, coords];
        }
      );

    this.tracking = true;
  }

  stopTracking() {
    if (this.locationSubscription.current) {
      this.locationSubscription.current.remove();
      this.locationSubscription.current = null;
    }
    this.tracking = false;
    return this.positions;
  }

  isRunning() {
    return this.locationSubscription !== null;
  }
}

export default new GpsTracker();