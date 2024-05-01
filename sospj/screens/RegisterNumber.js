import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { userAxios } from '../API/requestNode';

function RegisterNumber({navigation,route}) {
  const username = route?.params?.id || 'Unknown User';
  
  const [contacts, setContacts] = useState([{name: '', phone: ''}]);

  const handleAddContact = () => {
    if (contacts.length < 4) {
      setContacts([...contacts, {name: '', phone: ''}]);
    } else {
      Alert.alert('최대 네 개의 비상 연락처만 등록할 수 있습니다.');
    }
  };

  const handleToLogin = async () => {
    const response = await userAxios.sosChange({id:username,sos:contacts})
    console.log(response.sc)
    navigation.navigate('Login');
  };

  const formatPhoneNumber = text => {
    const digits = text.replace(/\D/g, '');
    // 11자리 숫자를 초과하지 않도록 제한
    const trimmed = digits.slice(0, 11);
    const match = trimmed.match(/^(\d{1,3})(\d{1,4})?(\d{1,4})?$/);
    if (match) {
      return `${match[1]}${match[2] ? '-' + match[2] : ''}${
        match[3] ? '-' + match[3] : ''
      }`;
    }
    return text;
  };

  const handleChangePhoneNumber = (text, index) => {
    const newContacts = [...contacts];
    newContacts[index].phone = formatPhoneNumber(text);
    setContacts(newContacts);
  };

  return (
    <View style={styles.container}>
      <Text>비상 연락망 등록</Text>
      {contacts.map((contact, index) => (
        <View key={index} style={styles.contactContainer}>
          <TextInput
            placeholder="이름"
            value={contact.name}
            onChangeText={text => {
              const newContacts = [...contacts];
              newContacts[index].name = text;
              setContacts(newContacts);
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="전화번호"
            keyboardType="numeric"
            value={contact.phone}
            onChangeText={text => handleChangePhoneNumber(text, index)}
            style={styles.input2}
          />
        </View>
      ))}
      {contacts.length < 4 && (
        <TouchableOpacity onPress={handleAddContact}>
          <Image
            source={require('../assets/images/plus2.png')}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      )}
      <Button title="뒤로 가기" onPress={() => navigation.goBack()} />
      <Button
        title="로그인하기"
        onPress={handleToLogin}
        color="#4CAF50"
        style={styles.button}
      />
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
  input: {
    width: 100,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  input2: {
    width: 200,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStyle: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
});

export default RegisterNumber;
