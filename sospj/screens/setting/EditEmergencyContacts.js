import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useUser } from '../../components/public/UserContext';
import { userAxios } from '../../API/requestNode';
function EditEmergencyContacts({navigation}) {
  const [contacts, setContacts] = useState([]);
  const {user, setUser} = useUser();
  // Simulate fetching data from a database upon component mounting
  const loadData = async() =>{
    const response =await userAxios.sosList({id:user.id})
    if(response.sc == 200){
      setContacts(response.data)
    }
  }
  useEffect(() => {
    loadData()
  }, []);

  const handleSave = async () => {
    const newContacts = contacts.map((contact) => {
      return { name: contact.name ,phone:contact.phone}; // t2 값만 추출하여 새로운 객체 생성
    });
    console.log(newContacts)
    const response = await userAxios.sosChange({id:user.id,sos:newContacts})
  };

  const handleChange = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);

    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Emergency Contacts</Text>
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
      <TouchableOpacity style={styles.buttonStyle} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Applying the specified color code as the background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32', // A darker green for contrast
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15, // Adjusting the margin for spacing
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0BEC5', // Light gray border
    borderRadius: 5,
    padding: 10,
    flex: 1,
    backgroundColor: 'white', // Ensure the text input is easy to read
    color: '#424242', // Darker text color for contrast
  },
  buttonStyle: {
    backgroundColor: '#388E3C', // Deep green for buttons
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center', // Ensure text is centered
    height: 50,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18, // Slightly smaller font size
  },
});

export default EditEmergencyContacts;
