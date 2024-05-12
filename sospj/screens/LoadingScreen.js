import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        style={{
          width: 70,
          height: 70,
        }}
        source={require('../assets/lottie/process.json')}
        autoPlay
        loop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});

export default LoadingScreen;
