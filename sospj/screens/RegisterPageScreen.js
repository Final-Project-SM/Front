import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { userAxios } from '../API/requestNode';
function RegisterPageScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState(null); // 성별 상태 추가
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSignUp = async () => {
    console.log(gender)
    const response = await userAxios.signUp({id:username,password:password,name:name,age:birthdate,gender:gender,phone:phoneNumber})
    if(response.sc == 200){
      navigation.navigate('RegisterNumber',{id:username});
    }else{
      Alert.alert("해당아이디 이미 사용중")
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthdate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label2}>아이디</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <Text style={styles.label2}>비밀번호</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <Text style={styles.label2}>이름</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.label2}>성별</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'male' && styles.selectedGender,
          ]}
          onPress={() => setGender('male')}>
          <Text style={styles.genderText}>남자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'female' && styles.selectedGender,
          ]}
          onPress={() => setGender('female')}>
          <Text style={styles.genderText}>여자</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label2}>전화번호</Text>
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Text style={styles.label2}>생년월일</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.label}>
          {birthdate.toISOString().split('T')[0]}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={birthdate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>비상연락망 등록하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>초기화면으로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // 기존 스타일 유지
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  input: {
    width: '90%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF', // 배경색을 하얗게 설정
    borderWidth: 0, // 테두리 너비 제거
    borderRadius: 8, // 둥근 테두리 설정
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
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 5,
  },
  label2: {
    fontSize: 14, // 적절한 글꼴 크기
    color: '#FFFFFF', // 짙은 회색으로 텍스트 색상 설정
    fontWeight: '500', // 폰트 두께를 중간 정도로 설정
    paddingHorizontal: 15, // 좌우 패딩, 인풋 필드와 동일하게 맞춤
    padding: 3,
    marginRight: 200,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  genderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  genderButton: {
    width: '45%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    color: 'white',
  },
  genderText: {
    fontSize: 16,
  },
});

export default RegisterPageScreen;
