import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useUser} from '../../components/public/UserContext';
import {userAxios} from '../../API/requestNode';
import ContactList from '../setting/ContactList';
import styles from '../../styleFolder/EditEmergencyContactsStyles';

/**
 * @function EditEmergencyContacts
 * @description 비상 연락처를 수정하는 화면을 렌더링합니다.
 * @param {Object} props - 컴포넌트의 속성.
 * @returns {JSX.Element} EditEmergencyContacts 컴포넌트
 */
function EditEmergencyContacts({navigation}) {
  const [contacts, setContacts] = useState([]);
  const {user, setUser} = useUser();

  /**
   * @function loadData
   * @description 서버에서 비상 연락처 목록을 불러옵니다.
   */
  const loadData = async () => {
    const response = await userAxios.sosList({id: user.id});
    if (response.sc === 200) {
      setContacts(response.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   * @function handleSave
   * @description 비상 연락처 목록을 저장합니다.
   */
  const handleSave = async () => {
    const newContacts = contacts.map(contact => ({
      name: contact.name,
      phone: contact.phone,
    }));
    console.log(newContacts);
    const response = await userAxios.sosChange({
      id: user.id,
      sos: newContacts,
    });
    navigation.goBack();
  };

  /**
   * @function handleSelectContact
   * @description 연락처를 선택하여 추가합니다.
   * @param {Object} contactData - 선택된 연락처 데이터.
   */
  const handleSelectContact = contactData => {
    if (contacts.length < 4) {
      setContacts(prevContacts => [...prevContacts, contactData]);
    } else {
      alert('최대 4개의 연락처를 추가할 수 있습니다.');
    }
  };

  /**
   * @function handleDeleteContact
   * @description 연락처를 삭제합니다.
   * @param {number} index - 삭제할 연락처의 인덱스.
   */
  const handleDeleteContact = index => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{height: 580}}>
        {contacts.map((contact, index) => (
          <View key={contact.seq} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={contact.name}
              onChangeText={text => handleChange(index, 'name', text)}
              placeholder="Name"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              value={contact.phone}
              onChangeText={text => handleChange(index, 'phone', text)}
              placeholder="Phone"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
            />
            <TouchableOpacity
              onPress={() => handleDeleteContact(index)}
              style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>삭제</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <ScrollView
        style={{
          paddingHorizontal: 10,
          borderRadius: 25,
          backgroundColor: 'Black',
          borderWidth: 2,
        }}>
        <ContactList onContactSelect={handleSelectContact} />
      </ScrollView>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleSave}>
        <Text style={styles.buttonText}>수정하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditEmergencyContacts;
