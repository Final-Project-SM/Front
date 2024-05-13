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
  ScrollView,
} from 'react-native';
import {userAxios} from '../API/requestNode';
import ContactList from '../screens/setting/ContactList';
import {useUser} from '../../components/public/UserContext';

function RegisterNumber({navigation, route}) {
  const username = route?.params?.id || 'Unknown User';

  const [contacts, setContacts] = useState([{name: '', phone: ''}]);

  const handleAddContact = () => {
    if (contacts.length < 4) {
      setContacts([...contacts, {name: '', phone: ''}]);
    } else {
      Alert.alert('최대 네 개의 비상 연락처만 등록할 수 있습니다.');
    }
  };
  const handleDeleteContact = index => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };
  const handleToLogin = async () => {
    const response = await userAxios.sosChange({id: username, sos: contacts});
    console.log(response.sc);
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
  //연락처불러오기
  const handleSelectContact = contactData => {
    if (contacts.length < 4) {
      setContacts(prevContacts => [...prevContacts, contactData]);
    } else {
      alert('최대 4개의 연락처를 추가할 수 있습니다.');
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{backgroundColor: 'white', height: 260, alignItems: 'center'}}>
        <Text style={{fontSize: 18, color: 'black'}}>비상 연락망 등록</Text>
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
            <TouchableOpacity
              onPress={() => handleDeleteContact(index)}
              style={styles.deleteButton}>
              <Text>삭제</Text>
            </TouchableOpacity>
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
      </View>
      <ScrollView>
        <ContactList onContactSelect={handleSelectContact} />
      </ScrollView>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('StartingHelp')}>
        <Text style={styles.secondaryButtonText}>도움말(필독)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('HiddenKeyword')}>
        <Text style={styles.secondaryButtonText}>신고키워드 설정하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.primaryButton} onPress={handleToLogin}>
        <Text style={styles.primaryButtonText}>로그인하기</Text>
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
  input: {
    width: 130,
    height: 40,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  input2: {
    width: 130,
    height: 40,

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
    width: 40,
    height: 40,
    marginVertical: 10,
  },
  deleteIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#388E3C', // Dark green border
    borderWidth: 2,
    width: '70%',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    margin: 3,
  },
  secondaryButtonText: {
    color: '#388E3C',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  primaryButton: {
    backgroundColor: '#388E3C', // Dark green button
    width: '70%',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#ffffff', // White text
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    height: 30,
    width: 40,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default RegisterNumber;
