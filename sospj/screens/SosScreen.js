import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AudioRecorderPlayer, {
  AudioSourceAndroidType,
  OutputFormatAndroidType,
  AudioEncoderAndroidType,
} from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import {AI_PATH} from '@env';
import {useUser} from '../components/public/UserContext';
import {useIsFocused} from '@react-navigation/native';
import styles from '../styleFolder/SosScreenStyles'; // 새로운 스타일 파일 가져오기

const audioRecorderPlayer = new AudioRecorderPlayer();
const audioPath = RNFS.CachesDirectoryPath + '/audio.wav';

/**
 * SosScreen 컴포넌트
 *
 * NFC 태그 시 사용자 음성을 10초 동안 녹음하고, 녹음된 파일을 Flask 서버로 전송하여
 * 분석 결과를 받는 기능을 제공합니다. 결과값에 따라 긴급 상황 여부를 확인합니다.
 *
 * @component
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {object} props.navigation - 내비게이션 객체
 * @param {object} props.route - 경로 객체, route.params에서 type을 가져옵니다.
 * @returns {JSX.Element} SosScreen 컴포넌트
 */
const SosScreen = ({navigation, route}) => {
  const {user, setUser} = useUser();
  const isFocused = useIsFocused();
  const [type, setType] = useState(
    route.params.type ? route.params.type : '없는데용 ',
  );
  const [loading, setLoading] = useState(true);

  /**
   * 음성 녹음을 시작하고, 10초 후에 녹음을 중지하여 서버로 전송하는 함수
   *
   * @async
   * @function
   */
  const startrecord = async () => {
    try {
      const audioSet = {
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        OutputFormatAndroid: OutputFormatAndroidType.DEFAULT,
        AudioEncoderAndroid: AudioEncoderAndroidType.DEFAULT,
      };
      setLoading(true);
      const result = await audioRecorderPlayer.startRecorder(null, audioSet);
      console.log(result);
      setTimeout(async () => {
        const result2 = await audioRecorderPlayer.stopRecorder();

        audioRecorderPlayer.removeRecordBackListener();
        console.log('Recording stopped after 10 seconds');
        console.log(result2);
        const formData = new FormData();

        formData.append('file', {
          uri: result2,
          name: 'audio4',
          type: 'audio/aac',
        });
        formData.append('id', user.id);
        console.log('axios');
        console.log('1');
        const response = await axios.post(
          'http://43.202.64.160:5000/predict',
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
        user.type = true;
        setUser(user);
        console.log('이거 안돌아감?');
        navigation.navigate('Home2', {type: 'test'});
      }, 11000);
    } catch (error) {
      console.error('Failed to start recording: ', error);
      navigation.navigate('Main');
    }
  };

  useEffect(() => {
    console.log('sos스크린입니다', type);
    if (isFocused && type == 1) {
      startrecord();
    }
  }, [isFocused]);

  /**
   * 테스트 함수로, 메인 화면으로 이동합니다.
   */
  const test = async () => {
    await navigation.navigate('Main');
  };

  /**
   * 긴급 상황 확인 화면에서 '예' 버튼을 눌렀을 때 호출되는 함수
   */
  const changeType = () => {
    setType('1');
    startrecord();
  };

  /**
   * 긴급 상황 확인 화면에서 '아니요' 버튼을 눌렀을 때 호출되는 함수
   */
  const nextPage = async () => {
    await navigation.navigate('Main');
  };

  if (type == 2) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/SirenImage.png')}
          style={{width: 100, height: 100, margin: 10}}
        />
        <Text style={styles.title}>긴급 상황 확인</Text>
        <Text style={styles.message}>정말 긴급 상황이 맞습니까?</Text>
        <TouchableOpacity style={styles.button1} onPress={changeType}>
          <Text style={styles.buttonText}>예(신고)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={nextPage}>
          <Text style={styles.buttonText}>아니요</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
