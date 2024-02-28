import React, {useEffect, useRef} from 'react';
import {View, Alert} from 'react-native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  NoCameraDeviceError,
} from 'react-native-vision-camera';

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    const requestCameraPermission = async () => {
      const granted = await requestPermission();
      if (!granted) {
        Alert.alert(
          'Permission Denied',
          'Camera permission is required to use the camera.',
        );
      }
    };

    requestCameraPermission();
  }, []);

  if (!device) {
    return <NoCameraDeviceError />;
  }

  return (
    <View style={{flex: 1}}>
      {hasPermission ? (
        <Camera
          style={{flex: 1}}
          device={device}
          isActive={true}
          ref={cameraRef}
          autoFocus="on"
          flash="auto"
        />
      ) : (
        <></>
      )}
    </View>
  );
}
