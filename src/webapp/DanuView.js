import React, {useRef, useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {
  StyleSheet,
  View,
  NativeEventEmitter,
  NativeModules,
  Linking,
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

  //웹뷰에서 새창열기 시도 시
  const handleShouldStartLoadWithRequest = request => {
    // 외부 링크에 대한 조건을 확인하고, 해당하는 경우 외부 브라우저에서 링크를 엽니다.
    if (request.url.startsWith('http://www.danusys.com/')) {
      Linking.openURL(request.url);
      return false; // WebView에서는 페이지를 로드하지 않음
    }
    return true; // WebView 내에서 로드를 계속함
  };

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
      <WebView
        ref={webViewRef}
        style={styles.container}
        source={{uri: 'http://reactwebapp.dothome.co.kr/webapp/'}}
        // source={{uri: 'http://172.20.14.69:3000/webapp/'}}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
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
