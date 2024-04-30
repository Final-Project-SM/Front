import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const CaseStore = ({navigation}) => {
  const url =
    'https://minecase.com/product/detail.html?product_no=16958&cate_no=777&display_group=1'; // 여기에 원하는 웹 페이지 주소를 입력하세요.

  return (
    <View style={styles.container}>
      <WebView source={{uri: url}} style={styles.webview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  webview: {
    flex: 1,
  },
});

export default CaseStore;
