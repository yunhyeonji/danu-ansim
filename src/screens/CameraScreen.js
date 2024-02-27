import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  FlashMode,
} from 'react-native-vision-camera';

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  if (device == null) return <NoCameraDeviceError />;

  // 플래쉬 켜기
  const toggleFlash = async () => {
    // try {
    //   const photo = await camera.current.takePhoto({
    //     flash: on,
    //   });
    // } catch (error) {
    //   console.error('Failed to toggle flash:', error);
    // }
  };

  return (
    <View style={{flex: 1}}>
      <Camera
        style={{flex: 1}}
        device={device}
        isActive={true}
        ref={cameraRef}
        autoFocus="on"
        flash="off"
      />
      <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
        <Button title="Toggle Flash" onPress={toggleFlash} />
      </View>
    </View>
  );
}
