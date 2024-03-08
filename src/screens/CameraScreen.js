import React, {useEffect, useRef} from 'react';
import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  NoCameraDeviceError,
} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';

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

  const onPressButton = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePhoto({
      flash: 'auto',
      qualityPrioritization: 'speed',
    });
    console.log(photo);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: '앱이 저장소에 접근하여 파일을 저장하려고 합니다.',
          buttonPositive: '확인',
          buttonNegative: '취소',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('저장소에 대한 권한이 허용되었습니다.');
        const fileName = photo.path.split('mrousavy')[1];
        console.log(fileName);
        await RNFS.moveFile(
          `/${photo.path}`,
          `${RNFS.PicturesDirectoryPath}/${fileName}`,
        ).then(() =>
          console.log(
            'Image Moved',
            `${fileName}`,
            '-- to --',
            `${RNFS.PicturesDirectoryPath}`,
          ),
        );
      } else {
        console.log('저장소에 대한 권한이 거부되었습니다.');
      }
    } catch (err) {
      console.warn('저장소 권한 요청 오류:', err);
    }
  };

  if (!device) {
    return <NoCameraDeviceError />;
  }

  return (
    <View style={{flex: 1}}>
      {hasPermission ? (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          photo={true}
          video={false}
          audio={false} // 선택사항
          isActive={true}
        />
      ) : (
        <></>
      )}
      <View style={styles.area}>
        <TouchableOpacity style={styles.camButton} onPress={onPressButton}>
          <Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  area: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '10%',
  },
  camButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#e34077',
  },
});
