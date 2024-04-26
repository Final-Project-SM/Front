import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(
    'https://example.com/default_profile.jpg',
  );

  const handleSave = () => {
    console.log('Profile Saved', {name, email});
    // Add logic here for saving profile data, like sending it to a server, etc.
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image source={{uri: profileImage}} style={styles.profileImage} />
        <TouchableOpacity style={styles.changeProfileButton}>
          <Text style={styles.changeProfileButtonText}>Change Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9', // Matching the background color
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#388E3C', // Adding a green border for consistency
    borderWidth: 2,
  },
  changeProfileButton: {
    backgroundColor: '#007BFF', // Maintained the blue color for buttons
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  changeProfileButtonText: {
    color: 'white',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold', // Adding bold for better readability
    color: '#2E7D32', // Matching the title color from previous component
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0BEC5', // Light gray border
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white', // Ensure input background is white
    color: '#424242', // Consistent text color
  },
  saveButton: {
    backgroundColor: '#388E3C', // Deep green for the Save button
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16, // Consistent font size for buttons
    fontWeight: 'bold',
  },
});

export default EditProfile;
