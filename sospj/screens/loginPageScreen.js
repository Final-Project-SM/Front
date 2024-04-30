import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useUser} from '../components/public/UserContext';
import {userAxios} from '../API/requestNode';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginPageScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser} = useUser();

  const handleLogin = async () => {
    const data = {id: username, password: password};
    console.log(username, password);
    const response = await userAxios.login(data);
    if (response.sc == 200) {
      Alert.alert('로그인 성공 ');
      const testu = {id: '12345'};
      setUser({id: '222'});
      await AsyncStorage.setItem('user', JSON.stringify(testu));
      navigation.navigate('Main');
    } else {
      Alert.alert('아이디 혹은 패스워드 잘못됨 ');
    }
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>로그인</Text>
      <TextInput
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>뒤로가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  button: {
    minWidth: 150,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginPageScreen;
