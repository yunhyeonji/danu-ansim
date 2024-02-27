import {Button, View} from 'react-native';

const HomeScreen = ({navigation}) => {
  // console.log({ navigation });
  return (
    <View>
      <Button
        title="안전귀가 리액트네이티브 리팩토링"
        onPress={() => {
          navigation.navigate('danu');
        }}
      />
    </View>
  );
};

export default HomeScreen;
