import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import CameraScreen from './screens/CameraScreen';
import SoundPlayer from './func/sound';
import DanuView from './webapp/DanuView';
import DanusysHomepage from './webapp/DanusysHomepage';

const Stack = createNativeStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
      {/* 내비게이션 설정 */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
            // Header 블록에 대한 스타일
            headerStyle: {backgroundColor: '#29b6f6'},
            //Header의 텍스트, 버튼들 색상
            headerTintColor: '#fff',
            //타이틀 텍스트 스타일
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name="contact"
          component={ContactScreen}
          options={{
            title: `연락처 목록`,
          }}
        />
        <Stack.Screen
          name="camera"
          component={CameraScreen}
          options={{
            title: `카메라`,
          }}
        />
        <Stack.Screen
          name="fakeCall"
          component={SoundPlayer}
          options={{
            title: `테스트부분`,
          }}
        />
        <Stack.Screen
          name="danu"
          component={DanuView}
          options={({route}) => ({
            title: `다누시스 웹앱 테스트`,
            backgroundColor: route.params?.backgroundColor,
          })}
        />
        <Stack.Screen
          name="Danu"
          component={DanusysHomepage}
          options={{
            title: `다누시스 홈페이지`,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigations;
