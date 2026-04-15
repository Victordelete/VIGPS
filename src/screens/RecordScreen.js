import { CameraView, CameraType, useCameraPermissions, useMicrophonePermissions  } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { saveVideo, savePositions, getPositionByVideo } from "../database/db";
import GpsTracker from "../services/GpsTracker"
import * as Location from "expo-location";

export default function RecordScreen() {
  const [facing, setFacing] = useState(CameraType);
  const [permissionCamera, requestCameraPermission] = useCameraPermissions();
  const [permissionAudio, requestAudioPermission] = useMicrophonePermissions();
  const [permissionMedia, requestMediaPermission] = MediaLibrary.usePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [permissionGps, setPermissionGps] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);      // segundos decorridos
  const timerRef = useRef(null);                           // referência do intervalo

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionGps(status === "granted");
    })();
  }, []);

  // Limpa o timer se o componente for desmontado durante gravação
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const cameraRef = useRef(CameraView);

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '00')}`;
  }

  if (!permissionCamera || !permissionAudio || !permissionMedia || !permissionGps) {
    return <View />;
  }

  if (!permissionMedia.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necessário permissão para acessar arquivos.</Text>
        <Button onPress={requestMediaPermission} title="Permitir arquivos." />
      </View>
    );
  }

  if (!permissionCamera.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necessário permissão para acessar câmera.</Text>
        <Button onPress={requestCameraPermission} title="Permitir câmera." />
      </View>
    );
  }

  if (!permissionAudio.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necessário permissão para acessar audio.</Text>
        <Button onPress={requestAudioPermission} title="Permitir áudio" />
      </View>
    );
  }

  if (!permissionGps) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necessário permissão para acessar GPS.</Text>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const startRecording = async () => {
    if (!cameraRef.current) return;

    try {
      setIsRecording(true);
      setElapsedTime(0);
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);

      GpsTracker.startTracking();
      const video = await cameraRef.current?.recordAsync();
      const positions = GpsTracker.stopTracking();
      const asset = await MediaLibrary.createAssetAsync(video.uri);
      await MediaLibrary.createAlbumAsync("ViGPSVideos", asset, false);
      const video_values = {
        user_id: 1,
        name: asset.filename.slice(0, -4),
        path: asset.uri,
        record_date: new Date(asset.creationTime).toISOString().replace('T', ' ').slice(0, -5),
      };
      const video_id = await saveVideo(video_values);
      if (video_id) {
        await savePositions(video_id, positions);
        const positions_get = await getPositionByVideo(video_id);
      }
    } catch (err) {
      console.log("Erro ao gravar vídeo:", err);
    } finally {
      clearInterval(timerRef.current);
      setElapsedTime(0);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (!cameraRef.current) return;
    cameraRef.current.stopRecording();
    clearInterval(timerRef.current);
    setIsRecording(false);
  };

  return (
    <View style={styles.container}>
      <CameraView
        mode='video'
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
      />

      {/* Cronômetro — só aparece durante a gravação */}
      {isRecording && (
        <View style={styles.timerContainer}>
          <View style={styles.recordingDot} />
          <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity disabled={isRecording} style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Virar</Text>
        </TouchableOpacity>

        {!isRecording ? (
          <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
            <Text style={styles.text}>Gravar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
            <Text style={styles.text}>Parar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  timerContainer: {
    position: 'absolute',
    top: 52,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  timerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],  // evita o texto "pulando" a cada segundo
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  button: {
    padding: 16,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  recordButton: {
    padding: 16,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  stopButton: {
    padding: 16,
    backgroundColor: 'orange',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});