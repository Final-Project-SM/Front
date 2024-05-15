import React, {useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {useUser} from '../../components/public/UserContext';
import {userAxios} from '../../API/requestNode';
import styles from '../../styleFolder/EditProfileStyles';

/**
 * @function EditProfile
 * @description 프로필을 수정하는 화면을 렌더링합니다.
 * @param {Object} props - 컴포넌트의 속성.
 * @returns {JSX.Element} EditProfile 컴포넌트
 */
const EditProfile = ({navigation}) => {
  const {user, setUser} = useUser();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(
    'https://example.com/default_profile.jpg',
  );

  /**
   * @function handleSave
   * @description 프로필 정보를 저장합니다.
   */
  const handleSave = async () => {
    setUser({id: user.id, name, password});
    await userAxios.userChange({id: user.id, name, password});
    navigation.goBack();

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
            <Text style={styles.IDlabel}>ID : {user.id}</Text>
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
            value={password}
            onChangeText={setPassword}
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

export default EditProfile;
