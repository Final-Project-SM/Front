import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useUser} from '../components/public/UserContext';
import {userAxios, fcmAxios} from '../API/requestNode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setStorage} from '../util/function/asyncStorage';
import styles from '../styleFolder/LoginPageScreenStyles'; // 새로운 스타일 파일 가져오기

/**
 * 로그인 페이지 컴포넌트
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {object} props.navigation - 내비게이션 객체
 * @returns {JSX.Element} LoginPageScreen 컴포넌트
 */
function LoginPageScreen({navigation}) {
  const {user, setUser} = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
   * 로그인 처리 함수
   */
  const handleLogin = async () => {
    const data = {id: username, password: password};

    console.log(username, password);
    const response = await userAxios.login(data);
    if (response.sc == 200) {
      setUser({id: response.user.id, name: response.user.name});
      await setStorage(
        'user',
        JSON.stringify({
          id: response.user.id,
          name: response.user.name,
          password: response.user.password,
        }),
      );
      await fcmAxios.fcmUpdate(response.user.id);
      navigation.navigate('Main');
    } else {
      Alert.alert('아이디 혹은 패스워드 잘못됨');
    }
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../assets/images/login.png')}
          style={styles.logo}
        />
        <Text style={styles.label}>아이디</Text>
        <TextInput
          placeholder="아이디"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input}
        />
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>뒤로가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginPageScreen;
