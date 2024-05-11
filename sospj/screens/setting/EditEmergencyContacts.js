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

  const formatPhoneNumber = text => {
    let cleaned = ('' + text).replace(/\D/g, '');
    if (cleaned.length > 11) {
      cleaned = cleaned.substring(0, 11);
    }
    let parts = [];
    if (cleaned.length > 7) {
      parts.push(
        cleaned.substring(0, 3),
        cleaned.substring(3, 7),
        cleaned.substring(7, 11),
      );
    } else if (cleaned.length > 3) {
      parts.push(cleaned.substring(0, 3), cleaned.substring(3));
    } else {
      parts.push(cleaned);
    }
    return parts.join('-');
  };

  const handleChange = (index, field, value) => {
    const newContacts = [...contacts];
    if (field === 'phone') {
      value = formatPhoneNumber(value);
    }
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  const addContact = () => {
    const newContact = {name: '', phone: '', seq: Date.now()};
    setContacts([...contacts, newContact]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputTitle}>
        <Text>이름</Text>
        <Text>전화번호</Text>
      </View>
      <ScrollView>
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
          </View>
        ))}
      </ScrollView>
      {contacts.length < 4 && (
        <TouchableOpacity style={styles.buttonStyle} onPress={addContact}>
          <Text style={styles.buttonText}>Add New Contact</Text>
        </TouchableOpacity>
      )}
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
    color: '#424242',
    margin: 2,
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
