import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useUser} from '../../components/public/UserContext';

const EditProfile = () => {
  const {user, setUser} = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(
    'https://example.com/default_profile.jpg',
  );

  const handleSave = () => {
    console.log('Profile Saved', {name, email});
    // 프로필 데이터 저장 로직 추가
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileImageContainer}>
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.IDBox}>
            <Text style={styles.IDlabel}>{user.id}</Text>
          </View>
          <Text style={styles.label}>이름</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder={user.name}
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            placeholder="비밀번호"
            placeholderTextColor="#aaa"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'space-between', // 스타일 조정
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#388E3C',
    borderWidth: 2,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  IDlabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#424242',
  },
  IDBox: {
    borderColor: '#B0BEC5',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#424242',
  },
  saveButton: {
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;
