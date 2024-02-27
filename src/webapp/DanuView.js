import React, {useRef, useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {Button, StyleSheet, View} from 'react-native';
import {Accelerometer} from 'react-native-sensors';
import ShakeComponent from '../func/shaking';
// import * as Notifications from 'expo-notifications';

export default function DanuView({route, navigation}) {
  const webViewRef = useRef(null);
  const [shakeCount, setShakeCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  // 전화번호부 선택 이벤트 처리
  useEffect(() => {
    const phoneNumber = route.params?.phoneNumber;
    if (phoneNumber) {
      postWebviewMessage(phoneNumber);
      navigation.setParams({phoneNumber: null});
    }
  }, [route.params?.phoneNumber]);

  // 이미지 사진 받는 이벤트 처리
  useEffect(() => {
    const photoURL = route.params?.photoURL;
    if (photoURL) {
      postWebviewMessage(photoURL.uri);
      navigation.setParams({photoURL: null});
    }
  }, [route.params?.photoURL]);

  // 웹뷰에서 이벤트 받기
  const onWebviewMessage = e => {
    let data = e.nativeEvent.data.split(',');
    if (data[0] === 'N') {
      sendNotification();
    } else {
      navigation.navigate(data[1]);
    }
  };

  // 웹뷰로 이벤트 보내기
  const postWebviewMessage = message => {
    webViewRef.current.postMessage(message);
  };

  return (
    <View style={{flex: 1}}>
      <ShakeComponent webViewRef={webViewRef} />
      <Button
        title="앱단에서 이벤트보내기"
        onPress={() => postWebviewMessage('네이티브에서 이벤트 보냅니다.')}
      />
      <WebView
        ref={webViewRef}
        style={styles.container}
        source={{uri: 'http://reactwebapp.dothome.co.kr/webapp/'}}
        onMessage={onWebviewMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
