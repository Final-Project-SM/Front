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
    // 여기에 프로필 저장 로직을 추가하세요. 예를 들어 서버로 데이터를 전송하는 코드 등
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
        <TextInput value={name} onChangeText={setName} style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeProfileButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  changeProfileButtonText: {
    color: 'white',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
});

export default EditProfile;
