import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {userAxios} from '../API/requestNode';
import ContactList from '../screens/setting/ContactList';
import {useUser} from '../components/public/UserContext';
import styles from '../styleFolder/RegisterNumberStyles'; // 새로운 스타일 파일 가져오기

/**
 * 비상 연락망 등록 화면 컴포넌트
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {object} props.navigation - 내비게이션 객체
 * @param {object} props.route - 라우트 객체
 * @returns {JSX.Element} RegisterNumber 컴포넌트
 */
function RegisterNumber({navigation, route}) {

  const [contacts, setContacts] = useState([{name: '', phone: ''}]);
  const {user, setUser} = useUser();
  const username = user.id;
  /**
   * 연락처 추가 함수
   */
  const handleAddContact = () => {
    if (contacts.length < 4) {
      setContacts([...contacts, {name: '', phone: ''}]);
    } else {
      Alert.alert('최대 네 개의 비상 연락처만 등록할 수 있습니다.');
    }
  };

  /**
   * 연락처 삭제 함수
   * @param {number} index - 삭제할 연락처의 인덱스
   */
  const handleDeleteContact = index => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  /**
   * 비상 연락망을 서버에 저장하고 로그인 화면으로 이동하는 함수
   */
  const handleToLogin = async () => {
    const response = await userAxios.sosChange({id: username, sos: contacts});
    console.log(response.sc);
    navigation.navigate('Login');
  };

  /**
   * 전화번호 형식을 포맷팅하는 함수
   * @param {string} text - 포맷팅할 전화번호
   * @returns {string} 포맷팅된 전화번호
   */
  const formatPhoneNumber = text => {
    const digits = text.replace(/\D/g, '');
    const trimmed = digits.slice(0, 11);
    const match = trimmed.match(/^(\d{1,3})(\d{1,4})?(\d{1,4})?$/);
    if (match) {
      return `${match[1]}${match[2] ? '-' + match[2] : ''}${
        match[3] ? '-' + match[3] : ''
      }`;
    }
    return text;
  };

  /**
   * 전화번호 입력 변경 시 호출되는 함수
   * @param {string} text - 입력된 전화번호
   * @param {number} index - 변경할 연락처의 인덱스
   */
  const handleChangePhoneNumber = (text, index) => {
    const newContacts = [...contacts];
    newContacts[index].phone = formatPhoneNumber(text);
    setContacts(newContacts);
  };

  /**
   * 연락처 선택 시 호출되는 함수
   * @param {object} contactData - 선택된 연락처 데이터
   */
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
        style={{
          backgroundColor: '#FFFFFF',
          height: 260,
          alignItems: 'center',
          borderRadius: 25,
          padding: 3,
          width: 340,
        }}>
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
      <View
        style={{
          borderWidth: 2,
          width: 450,
          margin: 5,
          borderColor: '#ADD8E6',
        }}></View>
      <ScrollView
        style={{
          width: 340,
        }}>
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

export default RegisterNumber;
