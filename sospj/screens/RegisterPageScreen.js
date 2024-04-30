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

function RegisterPageScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState(null); // 성별 상태 추가
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSignUp = () => {
    console.log({username, password, name, birthdate, phoneNumber, gender});
    Alert.alert(
      'Signup Clicked',
      `Username: ${username}, Password: ${password}, Name: ${name}, Birthdate: ${
        birthdate.toISOString().split('T')[0]
      }, Phone Number: ${phoneNumber}, Gender: ${gender}`,
    );
    navigation.navigate('RegisterNumber');
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthdate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>회원가입</Text>
      <Text style={styles.label}>아이디</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <Text style={styles.label}>이름</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.label}>성별</Text>
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
      <Text style={styles.label}>전화번호</Text>
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Text style={styles.smallText}>*Only numbers</Text>
      <Text style={styles.label}>생년월일</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  smallText: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 20,
  },
  button: {
    minWidth: 150,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
    width: '60%',
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
