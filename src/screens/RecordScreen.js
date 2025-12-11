import { CameraView, CameraType, useCameraPermissions, useMicrophonePermissions  } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecordScreen() {
  const [facing, setFacing] = useState(CameraType);
  const [permissionCamera, requestCameraPermission] = useCameraPermissions();
  const [permissionAudio, requestAudioPermission] = useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false);

  const cameraRef = useRef(null);

  if (!permissionCamera || !permissionAudio) {
    return <View />;
  }

  if (!permissionCamera.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nece ssário permissão para acessar câmera.</Text>
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

  function toggleCameraFacing() {
    setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const startRecording = async () => {
    if (!cameraRef.current) return;

    try {
      setIsRecording(true);

      const video = await cameraRef.current.recordAsync({
        maxDuration: 60, // opcional
        quality: '1080p', // opcional
        mute: true
      });

      console.log("🎥 Vídeo gravado:", video.uri);

      setIsRecording(false);
    } catch (err) {
      console.log("Erro ao gravar vídeo:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (!cameraRef.current) return;
    cameraRef.current.stopRecording();
    setIsRecording(false);
    console.log("📍 Gravação parada");
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing} 
        ref={cameraRef}
      />

      <View style={styles.buttonContainer}>

        {/* Alternar câmera */}
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Virar</Text>
        </TouchableOpacity>

        {/* Botão de gravar / parar */}
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
