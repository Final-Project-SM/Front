import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

function EditEmergencyContacts({navigation}) {
  const [contacts, setContacts] = useState([]);

  // Simulate fetching data from a database upon component mounting
  useEffect(() => {
    const fetchContacts = async () => {
      // Simulated fetching logic (replace with actual data fetching logic)
      const fetchedContacts = [
        {id: 1, name: 'John Doe', phone: '123-456-7890'},
        {id: 2, name: 'Jane Smith', phone: '987-654-3210'},
        {id: 3, name: 'Michael Brown', phone: '111-222-3333'},
        {id: 4, name: 'Emily Davis', phone: '444-555-6666'},
      ];
      setContacts(fetchedContacts);
    };

    fetchContacts();
  }, []);

  const handleSave = () => {
    // Simulate saving data to a database (replace with actual save logic)
    console.log('Saved contacts:', contacts);
    // Optionally, navigate to another page or display a confirmation message
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
          <View key={contact.id} style={styles.inputContainer}>
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
