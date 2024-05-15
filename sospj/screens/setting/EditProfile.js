import React, {useState, useEffect} from 'react';
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

  useEffect(() => {
    if (user) {
      setName(user.name); // 사용자 이름을 초기 상태로 설정
      setPassword(user.password); // 사용자 비밀번호를 초기 상태로 설정
    }
  }, [user]);

  /**
   * @function handleSave
   * @description 프로필 정보를 저장합니다.
   */
  const handleSave = async () => {
    setUser({id: user.id, name, password});
    await userAxios.userChange({id: user.id, name, password});
    navigation.goBack();
  };

  const moveToKeyword = async () => {
    navigation.navigate('Keyword');
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
            placeholder="이름"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            keyboardType="default"
            placeholder="비밀번호"
            placeholderTextColor="#aaa"
            secureTextEntry={true} // 비밀번호 입력 시 암호화 처리
          />
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={moveToKeyword}>
        <Text style={styles.saveButtonText}>신고키워드 수정하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>프로필 저장하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;
