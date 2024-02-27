import {accelerometer} from 'react-native-sensors';
import {useEffect, useState} from 'react';

const ShakeComponent = ({webViewRef}) => {
  const [shakeCount, setShakeCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  // WebView로 메시지 전송
  const postWebviewMessage = message => {
    webViewRef.current?.postMessage(message);
  };

  useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y, z, timestamp}) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);

      // 흔들기 감지 기준에 따라 조정 (임의의 값, 필요에 따라 조정)
      if (acceleration > 50) {
        console.log('x, y, z, timestamp: ', x, y, z, timestamp, acceleration);
        setShakeCount(prevCount => {
          const updatedCount = prevCount + 1;

          if (updatedCount >= 5) {
            postWebviewMessage('흔들기를 감지했습니다.');
            console.log('기기가 흔들렸습니다!', updatedCount);
            setNewCount(0); // 5번 흔들면 카운트를 리셋
            return 0;
          }

          setNewCount(updatedCount);
          return updatedCount;
        });
      }
    });

    // 구독 해제
    return () => subscription.unsubscribe();
  }, []);

  return null; // 렌더링이 필요 없는 경우 null 반환
};

export default ShakeComponent;
