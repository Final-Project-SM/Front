// EditEmergencyContacts.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useUser} from '../../components/public/UserContext';
import {userAxios} from '../../API/requestNode';
import ContactList from '../setting/ContactList';

function EditEmergencyContacts({navigation}) {
  const [contacts, setContacts] = useState([]);
  const {user, setUser} = useUser();

  const loadData = async () => {
    const response = await userAxios.sosList({id: user.id});
    if (response.sc === 200) {
      setContacts(response.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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

  const handleSelectContact = contactData => {
    if (contacts.length < 4) {
      setContacts(prevContacts => [...prevContacts, contactData]);
    } else {
      alert('최대 4개의 연락처를 추가할 수 있습니다.');
    }
  };

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
      <ScrollView>
        <ContactList onContactSelect={handleSelectContact} />
      </ScrollView>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleSave}>
        <Text style={styles.buttonText}>수정하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 5,
    padding: 5,
    flex: 1,
    backgroundColor: 'white',
    color: '#424242',
    margin: 2,
  },
  deleteButton: {
    padding: 6,
    backgroundColor: '#e53935',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
  buttonStyle: {
    backgroundColor: '#388E3C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  inputTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
});

export default EditEmergencyContacts;
