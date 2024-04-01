import React, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';

/**
 * 애플리케이션의 시작 화면을 나타내는 컴포넌트입니다. 사용자에게 회원가입 및 로그인을 할 수 있는 옵션을 제공합니다.
 * 
 * @param {Object} props - 컴포넌트에 전달된 props
 * @param {Object} props.navigation - 네비게이션 객체, 화면 이동에 사용됩니다.
 */
function StartScreen({ navigation }) {
  useEffect(() => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
    }
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>환영합니다!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.buttonText, styles.buttonOutlineText]}>로그인하기</Text>
      </TouchableOpacity>
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: '#007bff',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#007bff',
  },
});

export default StartScreen;
