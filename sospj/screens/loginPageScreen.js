import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {useUser} from '../components/public/UserContext';
import { userAxios } from '../API/requestNode';
function LoginPageScreen({ navigation }) {

  const {user,setUser} = useUser(); //사용방범 console.log(user.id) && setUser({id:response.id})
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    const data = {id:username,password:password}
    console.log(username, password);
    const response = await userAxios.login(data)
    if (response.sc == 200){
      Alert.alert("로그인 성공 ");
    }else{
      Alert.alert("아이디 혹은 패스워드 잘못됨 ");
    }
    setUsername("")
    setPassword("")
    navigation.navigate('Main')
    
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
