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
  const [gender, setGender] = useState(null);
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

  const formatPhoneNumber = text => {
    // Remove all non-numeric characters
    let cleaned = ('' + text).replace(/\D/g, '');

    // Check the length of cleaned numbers
    if (cleaned.length > 11) {
      cleaned = cleaned.substring(0, 11);
    }

    // Split the numbers into parts and reformat
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
  // 스타일 유지
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
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
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
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    paddingHorizontal: 15,
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
