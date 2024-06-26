import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {userAxios} from '../API/requestNode';
import styles from '../styleFolder/RegisterPageScreenStyles'; // 새로운 스타일 파일 가져오기
import {useUser} from '../components/public/UserContext';
/**
 * 회원가입 페이지 컴포넌트
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {object} props.navigation - 내비게이션 객체
 * @returns {JSX.Element} RegisterPageScreen 컴포넌트
 */
function RegisterPageScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {user, setUser} = useUser();
  /**
   * 회원가입 처리 함수
   */
  const handleSignUp = async () => {
    console.log(gender);
    const response = await userAxios.signUp({
      id: username,
      password: password,
      name: name,
      age: birthdate,
      gender: gender,
      phone: phoneNumber,
    });
    if (response.sc == 200) {
      setUser({id: username});
      navigation.navigate('RegisterNumber');
    } else {
      Alert.alert('해당 아이디 이미 사용중');
    }
  };

  /**
   * 생년월일 선택 변경 시 호출되는 함수
   * @param {object} event - 이벤트 객체
   * @param {Date} selectedDate - 선택된 날짜
   */
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthdate(currentDate);
  };

  /**
   * 전화번호 형식을 포맷팅하는 함수
   * @param {string} text - 포맷팅할 전화번호
   * @returns {string} 포맷팅된 전화번호
   */
  const formatPhoneNumber = text => {
    let cleaned = ('' + text).replace(/\D/g, '');
    if (cleaned.length > 11) {
      cleaned = cleaned.substring(0, 11);
    }
    let parts = [];
    if (cleaned.length <= 3) {
      parts.push(cleaned);
    } else if (cleaned.length <= 7) {
      parts.push(cleaned.slice(0, 3), cleaned.slice(3));
    } else {
      parts.push(cleaned.slice(0, 3), cleaned.slice(3, 7), cleaned.slice(7));
    }
    return parts.join('-');
  };

  /**
   * 전화번호 입력 변경 시 호출되는 함수
   * @param {string} text - 입력된 전화번호
   */
  const handlePhoneNumberChange = text => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
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
        onChangeText={handlePhoneNumberChange}
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
      <View style={{marginTop: 10}}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>비상연락망 등록하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>초기화면으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RegisterPageScreen;
