import LottieView from 'lottie-react-native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AppState,
  Image,
  Modal,
} from 'react-native';
import BackgroundService from 'react-native-background-actions';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import Sound from 'react-native-sound';
import {userAxios} from '../API/requestNode';
import {useUser} from './public/UserContext';
import {generateRandomuid} from '../util/function/random';
import {useIsFocused} from '@react-navigation/native';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

/**
 * Ansimi 컴포넌트
 *
 * 안심귀가 서비스 기능을 제공하는 컴포넌트입니다.
 * 사용자의 위치를 실시간으로 추적하고, 일정 조건에 따라 경고음을 재생합니다.
 *
 * @component
 * @returns {JSX.Element} Ansimi 컴포넌트
 */
const Ansimi = () => {
  const [asdf, setAsdf] = useState('1');
  const {user, setUser} = useUser(); // sos  type 전역변수담아 use effect 실행  type usestate 변수에담아서 끄면
  const isFocused = useIsFocused();
  const [isServiceRunning, setIsServiceRunning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  /**
   * 경고음을 재생하는 함수
   */
  const playSound = () => {
    const sound = new Sound(
      'https://finalcow.s3.ap-northeast-2.amazonaws.com/becareful2.mp3',
      null,
      error => {
        if (error) {
          console.log('Failed to load', error);
          return;
        }
        console.log('Sound loaded successfully');
        sound.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }
          sound.release(); // Release the sound instance to free up resources
        });

        setTimeout(() => {
          sound.stop(() => {
            console.log('Sound stopped');
            sound.release(); // Release the sound instance to free up resources
          });
        }, 3600); // 3.6초 후에 소리 재생 중지 (20% 증가)
      },
    );
  };

  /**
   * 두 번째 경고음을 재생하는 함수
   */
  const playSound2 = () => {
    const sound = new Sound(
      'https://finalcow.s3.ap-northeast-2.amazonaws.com/becareful.mp3',
      null,
      error => {
        if (error) {
          console.log('Failed to load', error);
          return;
        }
        console.log('Sound loaded successfully');
        sound.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }
          sound.release(); // Release the sound instance to free up resources
        });

        setTimeout(() => {
          sound.stop(() => {
            console.log('Sound stopped');
            sound.release(); // Release the sound instance to free up resources
          });
        }, 3600); // 3.6초 후에 소리 재생 중지 (20% 증가)
      },
    );
  };

  /**
   * 안심귀가 서비스를 시작하는 함수
   */
  const startService = async () => {
    setIsServiceRunning(true);
    await BackgroundService.start(veryIntensiveTask, options);
  };

  /**
   * 안심귀가 서비스를 중지하는 함수
   */
  const stopService = async () => {
    setIsServiceRunning(false);
    user.type = false;
    setUser(user);
    await BackgroundService.stop();
  };

  useEffect(() => {
    if (AppState.currentState == 'active' && BackgroundService.isRunning()) {
      setIsServiceRunning(true);
    }
    console.log('안심이테스트', user.type);
    if (user.type) {
      startService();
    }
  }, [isFocused]);

  /**
   * 사용자의 현재 위치를 가져오는 함수
   *
   * @param {number} i - 위치를 가져온 횟수
   * @param {string} uid - 위치 추적을 위한 고유 ID
   */
  const getLocation = (i, uid) => {
    Geolocation.getCurrentPosition(
      async position => {
        console.log(
          i,
          ' ',
          position.coords.latitude,
          position.coords.longitude,
        );
        try {
          const request = await userAxios.ansimi({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            i: i,
            id: user.id,
            uid: uid,
          });
          console.log(request);
          console.log(user.type + '유저타입');
          if (request.sc == 200 && request.total > 50 && user.type == false) {
            playSound();
          } else if (
            request.sc == 200 &&
            request.total > 25 &&
            user.type == false
          ) {
            playSound2();
          }
        } catch (err) {
          console.log(err);
        }
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 18000, maximumAge: 600}, // increased by 20%
    );
  };

  /**
   * 매우 집중적인 작업을 수행하는 함수
   *
   * @param {object} taskDataArguments - 작업 데이터 인수
   * @param {number} taskDataArguments.delay - 작업 간 지연 시간 (밀리초)
   */
  const veryIntensiveTask = async taskDataArguments => {
    const {delay} = taskDataArguments;
    const uid = generateRandomuid();
    await new Promise(async resolve => {
      for (
        let i = 0;
        BackgroundService.isRunning() || AppState.currentState == 'background';
        i++
      ) {
        try {
          console.log(AppState.currentState);
          getLocation(i, uid);
        } catch (err) {
          getLocation(i, uid);
        }
        await sleep(delay);
      }
    });
  };

  const options = {
    taskName: 'Example',
    taskTitle: '위치 공유중',
    taskDesc: '소중한 사람들에게 위치를 전송하고 있어요',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'sospj://test/nfc',
    parameters: {
      delay: 180000, // increased by 20%
    },
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={[styles.contents4, isServiceRunning && styles.contents4Active]}
        onPress={!isServiceRunning ? startService : stopService}>
        <View>
          <Text
            style={
              isServiceRunning ? styles.activeServiceTitle : styles.serviceTitle
            }>
            {isServiceRunning ? '현재 위치를 공유중입니다.' : '안심귀가 서비스'}
          </Text>
          <Text style={styles.serviceText}>
            {isServiceRunning
              ? '집에 도착하시면 반드시 서비스를 종료하세요'
              : '안전하게 귀가하세요!'}
          </Text>
        </View>
        <LottieView
          style={{
            width: 84, // increased by 20%
            height: 84, // increased by 20%
          }}
          source={
            isServiceRunning
              ? require('../assets/lottie/process.json')
              : require('../assets/lottie/gps.json')
          }
          autoPlay
          loop={true}
        />
      </TouchableOpacity>
      {!isServiceRunning && (
        <TouchableOpacity
          style={{
            width: 96, // increased by 20%
            height: 96, // increased by 20%
            backgroundColor: '#FFD1DC',
            borderRadius: 18, // increased by 20%
            marginTop: 17, // increased by 20%
            marginLeft: 12, // increased by 20%
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setModalVisible(true)}>
          <Image
            source={require('../assets/images/whatisit.png')} // 이미지 URL을 여기에 넣으세요.
            style={{width: 72, height: 72}} // increased by 20%
          />
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>'안심귀가 서비스'란 무엇인가?</Text>
            <Text style={styles.modalContents}>
              안심귀가 서비스란 실시간으로 위치를 추적하여, 공유하는 시스템
              입니다.
            </Text>
            <Text style={styles.modalContents}>
              대중교통 이용 후 도보로 이동할 때에 사용하시면 됩니다.
            </Text>
            <Text style={styles.modalContents}>
              사용자의 위치정보는 사용자가 등록한 보호자가 열람할 수 있습니다.
            </Text>
            <Text></Text>
            <Text style={{fontWeight: 'bold'}}>
              *집에 귀가 후 반드시 종료해주시기 바랍니다.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  contents4: {
    width: 282, // increased by 20%
    height: 96, // increased by 20%
    backgroundColor: '#FFD1DC',
    borderColor: 'black',
    borderRadius: 18, // increased by 20%
    marginTop: 17, // increased by 20%
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24, // increased by 20%
  },
  contents4Active: {
    width: 390, // increased by 20%
  },
  serviceText: {
    fontSize: 12, // increased by 20%
    fontWeight: 'bold',
    margin: 6, // increased by 20%
  },
  activeServiceTitle: {
    fontSize: 19.2, // increased by 20%
    fontWeight: 'bold',
    color: '#F44336',
  },
  serviceTitle: {
    fontSize: 19.2, // increased by 20%
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 360, // increased by 20%
    backgroundColor: 'white',
    borderRadius: 18, // increased by 20%
    padding: 24, // increased by 20%
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2.4, // increased by 20%
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.8, // increased by 20%
    elevation: 6,
  },
  modalText: {
    fontSize: 21.6, // increased by 20%
    marginBottom: 18, // increased by 20%
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 6, // increased by 20%
    padding: 12, // increased by 20%
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  modalContents: {
    fontFamily: 'SpoqaHanSansNeo-Light',
    margin: 3.6, // increased by 20%
  },
});

export default Ansimi;
