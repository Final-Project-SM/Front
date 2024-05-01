
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {useUser} from '../components/public/UserContext';
import { userAxios,fcmAxios } from '../API/requestNode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStorage } from '../util/function/asyncStorage';


function LoginPageScreen({navigation}) {
  const {user,setUser} = useUser()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const data = {id: username, password: password};

    console.log(username, password);
    const response = await userAxios.login(data)
    if (response.sc == 200){
      setUser({id:response.user.id})
      await setStorage('user',JSON.stringify({id:response.user.id}))
      await fcmAxios.fcmUpdate(response.user.id)
      navigation.navigate('Main')
    }else{
      Alert.alert("아이디 혹은 패스워드 잘못됨 ");

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  topSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: 80,
  },
  input: {
    width: '90%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF', // 배경색을 하얗게 설정
    borderWidth: 0, // 테두리 너비 제거
    borderRadius: 8, // 둥근 테두리 설정
    margin: 10,
    marginBottom: 16,
    fontSize: 16, // 폰트 사이즈 증가
    color: '#333', // 텍스트 색상 설정
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {width: 0, height: 2}, // 그림자 방향
    shadowOpacity: 0.1, // 그림자 투명도
    shadowRadius: 8, // 그림자 블러 반경
    elevation: 2, // 안드로이드 전용 그림자 설정
  },

  button: {
    minWidth: 300,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#4CAF50',
  },
  label: {
    fontSize: 14, // 적절한 글꼴 크기
    color: '#FFFFFF', // 짙은 회색으로 텍스트 색상 설정
    fontWeight: '500', // 폰트 두께를 중간 정도로 설정
    paddingHorizontal: 15, // 좌우 패딩, 인풋 필드와 동일하게 맞춤
    padding: 3,
    marginRight: 200,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30, // 추가한 마진
  },
  bottomSection: {
    width: '100%',
  },
  contentBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginPageScreen;
