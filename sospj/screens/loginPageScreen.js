import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {TEST} from "@env"
function LoginPageScreen({ navigation }) {
  Alert.alert(TEST)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 회원가입 로직을 여기에 구현하세요.
    // 예: API 호출을 통해 백엔드 서버에 회원가입 정보 전송
    console.log(username, password);
    navigation.navigate('Main')
    Alert.alert("Signup Clicked", `Username: ${username}, Password: ${password}`);
  };
  

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // 비밀번호 입력을 위해 텍스트를 숨깁니다.
        style={styles.input}
      />
      <Button title="로그인" onPress={handleLogin} />
      <Button title="회원가입" onPress={() => navigation.navigate('Register')} />

      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default LoginPageScreen;
