import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, ActivityIndicator} from 'react-native';
import axios from 'axios';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import {AI_PATH} from '@env';
import {useUser} from '../components/public/UserContext';
import {useIsFocused} from '@react-navigation/native';
import styles from '../styleFolder/SosScreenStyles'; // 새로운 스타일 파일 가져오기

const audioRecorderPlayer = new AudioRecorderPlayer();
const audioPath = RNFS.CachesDirectoryPath + '/test.mp4';

/**
 * SOS 화면 컴포넌트
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {object} props.navigation - 내비게이션 객체
 * @returns {JSX.Element} SosScreen 컴포넌트
 */
const SosScreen = ({navigation}) => {
  const {user} = useUser();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  /**
   * 음성 녹음을 시작하는 함수
   */
  const startrecord = async () => {
    try {
      setLoading(true);
      const result = await audioRecorderPlayer.startRecorder();
      console.log(result);
      setTimeout(async () => {
        const result2 = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        console.log('Recording stopped after 10 seconds');
        console.log(result2);
        const formData = new FormData();
        formData.append('file', {
          uri: result2,
          name: 'test',
          type: 'audio/aac',
        });
        formData.append('id', user.id);
        console.log('axios');
        console.log('1');
        const response = await axios.post(
          'http://192.168.0.22:5000/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log(response.data);
      }, 10000); // 10초를 밀리초로 변환하여 전달
      setTimeout(() => {
        navigation.navigate('Main');
      }, 11000);
    } catch (error) {
      console.error('Failed to start recording: ', error);
      navigation.navigate('Main');
    }
  };

  useEffect(() => {
    if (isFocused) {
      startrecord();
    }
  }, [isFocused]);

  /**
   * 테스트 함수로, 메인 화면으로 이동
   */
  const test = async () => {
    await navigation.navigate('Main');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/telephone.png')} // gif 이미지 경로
          style={styles.image}
        />
        <Text style={styles.loadingText}>음성 녹음 중...</Text>
        <ActivityIndicator
          size="large"
          color="#ff4d4f"
          style={styles.spinner}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text> 음성 녹음 끝 </Text>
      <Button title="로그인" onPress={test} />
    </View>
  );
};

export default SosScreen;
