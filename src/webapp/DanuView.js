import React, {useRef, useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {
  Button,
  StyleSheet,
  View,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import ShakeComponent from '../func/shaking';
import Flash from '../func/flash';
import SoundPlayer from '../func/sound';

export default function DanuView({route, navigation}) {
  const webViewRef = useRef(null);
  const [torch, setTorch] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  // 볼륨업키 3번이상 눌렀을 경우 sos
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.MyCustomModule);

    const subscription = eventEmitter.addListener('VolumeUpPressed', () => {
      postWebviewMessage(
        JSON.stringify({
          sos: '볼륨키를 세번이상 눌러 위급상황을 호출하였습니다.',
        }),
      );
    });

    return () => subscription.remove();
  }, []);

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
    console.log(data);
    if (data[0] === 'N') {
      if (data[1] === 'SOS') {
        setTorch(!torch);
      } else if (data[1] === 'fakeCall') {
        setSoundOn(!soundOn);
      }
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
      <ShakeComponent webViewRef={webViewRef} setTorch={setTorch} />
      <Flash torch={torch} />
      <SoundPlayer soundOn={soundOn} />
      <Button
        title="앱단에서 이벤트보내기"
        onPress={() => postWebviewMessage('네이티브에서 이벤트 보냅니다.')}
      />
      <WebView
        ref={webViewRef}
        style={styles.container}
        // source={{uri: 'http://reactwebapp.dothome.co.kr/webapp/'}}
        source={{uri: 'http://172.20.14.69:3000/webapp/'}}
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
