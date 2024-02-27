import * as React from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet} from 'react-native';

export default function DanusysHomepage() {
  return (
    <WebView
      style={styles.container}
      source={{
        uri: 'http://www.danusys.com/',
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
