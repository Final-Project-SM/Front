import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  ScrollView,
  Linking,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
  Alert,
  Pressable,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
//import styles from '../teststyle/HomeStyle';
import styles from '../styleFolder/HomeStyle';
import {BarChart} from 'react-native-chart-kit'; // 그래프를 위한 라이브러리
import {REACT_APP_KAKAO_REST_KEY} from '@env';
import {FetchDataKakao} from '../API/FetchDataKakao';
import ImageSlider from '../components/Imageslider';
import Swiper from 'react-native-swiper';
import CurrentLocation from '../components/currentLocation';
import axios from 'axios';
import VideoPlayer from '../components/video';
import {StatusBar} from 'react-native';
import {useUser} from '../components/public/UserContext';
import {userAxios} from '../API/requestNode';
import {useIsFocused} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import Graph from '../components/graph';
import CurrentTime from '../components/CurrentTime';
import LottieView from 'lottie-react-native';
import Torch from 'react-native-torch';
import Sound from 'react-native-sound';
import SystemSetting from 'react-native-system-setting';

// 예시 그래프 데이터
const graphData = {
  labels: ['강남', '은평', '마포', '잠실', '광화문', '강북'],
  datasets: [
    {
      data: [7, 10, 7, 24, 3, 15], // 각 지역별 사고 횟수
    },
  ],
};

/**
 * 전화번호를 호출하는 함수.
 * @param {string} phoneNumber - 호출할 전화번호.
 */
function callNumber(phoneNumber) {
  const cleanPhoneNumber = phoneNumber.replace(/-/g, '');
  Linking.openURL(`tel:${cleanPhoneNumber}`);
}

/**
 * HomeScreen 컴포넌트는 앱의 홈 화면을 렌더링합니다.
 * @param {object} navigation - 화면 간의 내비게이션 객체.
 * @returns {JSX.Element} HomeScreen 컴포넌트.
 */
function HomeScreen({navigation}) {
  const {user} = useUser();
  const isFocused = useIsFocused();
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isActive, setIsActive] = useState(false); // 버튼 상태 관리
  const [news, setNews] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundInstance, setSoundInstance] = useState(null);
  const [modalVisibleText, setModalVisibleText] = useState(false);
  const [message, setMessage] = useState(user.name + '님이 위험합니다.');
  const [editableMessage, setEditableMessage] = useState(message);

  /**
   * 서버에서 데이터를 불러오는 함수.
   */
  const loadData = async () => {
    const data = await userAxios.main({id: user.id});
    if (data.sc == 200) {
      console.log(data.list);
      setNews(data.news);
      setContacts(data.list);
    }
  };
  useEffect(() => {
    return () => Torch.switchState(false);
    sirenSound.release(); // 컴포넌트 언마운트 시 후레쉬 끄기
  }, []);

  useEffect(() => {
    loadData();
  }, [isFocused]);

  const screens = [
    require('../assets/images/rway1.png'),
    require('../assets/images/rway2.png'),
    require('../assets/images/rway3.png'),
    require('../assets/images/rway4.png'),
    require('../assets/images/rway5.png'),
    require('../assets/images/rway6.png'),
  ];

  const sirenSound = new Sound(
    require('../assets/video/policeSiren.mp3'),
    error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      // 파일 로드가 성공했을 때 실행할 코드
      console.log('Sound is loaded successfully');
      // 무한 반복 설정 (-1은 무한 반복을 의미)
      sirenSound.setVolume(1.0); // 최대 음량 설정
    },
  );

  /**
   * 모달의 가시성을 토글하는 함수.
   * @param {boolean} visible - 모달의 가시성 여부.
   */
  const handleModalToggle = visible => {
    setModalVisible3(visible);
    setCurrentScreen(0); // 모달을 열 때 항상 첫 번째 스크린으로 초기화
  };

  /**
   * '신고 방법' 모달을 여는 함수.
   */
  const howToReport = () => {
    setModalVisible3(true);
  };

  /**
   * 기본 웹 브라우저에서 URL을 여는 함수.
   * @param {string} newsUrl - 열 URL.
   */
  const handlePress = newsUrl => {
    Linking.openURL(newsUrl);
  };

  /**
   * 영상통화 모달을 여는 함수.
   * @param {string} phone - 영상통화용 전화번호.
   */
  const callVideo = phone => {
    // 전화 걸기 로직 (여기서는 모달을 표시하는 것으로 대체)
    setModalVisible(true);
  };

  /**
   * 영상통화 모달을 여는 함수.
   * @param {string} phone - 영상통화용 전화번호.
   */
  const callVideo2 = phone => {
    // 전화 걸기 로직 (여기서는 모달을 표시하는 것으로 대체)
    setModalVisible2(true);
  };

  /**
   * 서비스 활성화 상태를 토글하는 함수.
   */
  const changeService = () => {
    setIsActive(!isActive);
  };

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  /**
   * 비디오 로드 이벤트를 처리하는 함수.
   */
  const handleVideoLoad = () => {
    console.log('Video loaded!');
    setIsVideoLoaded(true); // 비디오가 로드되었음을 상태로 설정
  };
  /**
   * @function handleEdit
   * @description 수정 버튼 클릭 시 호출됩니다.
   */
  const handleEdit = () => {
    console.log('수정 버튼 클릭됨');
  };
  /**
   * 사용자로부터 카메라 권한을 요청하는 함수.
   * @returns {Promise<boolean>} - 카메라 권한이 부여되었는지 여부.
   */
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission to use the flashlight',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  /**
   * 손전등(후레쉬) 상태를 토글하는 함수.
   */
  const toggleTorch = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setIsTorchOn(!isTorchOn);
      Torch.switchState(!isTorchOn);
    } else {
      Alert.alert(
        'Permissions required',
        'Camera permission is required to use flashlight',
      );
    }
  };

  /**
   * 사이렌 소리를 켜거나 끄는 함수.
   */
  const toggleSound = () => {
    if (isPlaying) {
      if (soundInstance) {
        soundInstance.stop();
        setSoundInstance(null);
      }
    } else {
      // 볼륨을 최대치로 설정
      SystemSetting.setVolume(1.0); // 1.0은 최대 볼륨을 의미

      const sound = new Sound(
        require('../assets/video/policeSiren.mp3'),
        error => {
          if (error) {
            console.log('Failed to load', error);
            return;
          }
          console.log('Sound good');

          sound.play(success => {
            if (success) {
              console.log('Sound good');
            } else {
              console.log('playback');
            }
          });
          setSoundInstance(sound);
        },
      );
    }
    setIsPlaying(!isPlaying);
  };

  const EditTextMethod = () => {
    setModalVisibleText(true);
  };

  const handleSendMessage = () => {
    Geolocation.getCurrentPosition(
      position => {
        sendSosMessage(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    setModalVisibleText(false);
  };

  // /**
  //  * 현재 기기의 위치를 가져오는 함수.
  //  */
  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       sendSosMessage(position.coords.latitude, position.coords.longitude);
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // };

  /**
   * 현재 위치와 함께 SOS 메시지를 전송하는 함수.
   * @param {number} lat - 현재 위치의 위도.
   * @param {number} lon - 현재 위치의 경도.
   */
  const sendSosMessage = async (lat, lon) => {
    await userAxios.sns({id: user.id, lat: lat, lon: lon, text: message});
    Alert.alert('일괄문자 전송 완료');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <FetchDataKakao apiUrl={apiUrl} /> */}
      <View style={{height: 80, marginTop: 10}}>
        <Swiper
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={5} // 여기서 자동 넘김 간격을 5초로 설정
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
            margin: 3,
            backgroundColor: 'grey',
          }}
          activeDotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
            margin: 3,
            backgroundColor: 'green',
          }}
          paginationStyle={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            color: 'black',
          }}>
          {news.map((news, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => Linking.openURL(news.url)}
              style={{flex: 1}}>
              <ImageBackground
                source={require('../assets/images/news.png')}
                resizeMode="stretch"
                style={styles.imageBackground}>
                <View style={styles.newscontainer}>
                  <Text style={styles.text}>{news.title}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </Swiper>
      </View>
      <View style={styles.contentsContainer}>
        <View style={styles.contents1}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{margin: 4, fontFamily: 'SpoqaHanSansNeo-Bold'}}>
              비상연락처
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditEmergencyContacts')}>
              <Text
                style={{
                  margin: 4,
                  marginTop: 8,
                  marginRight: 6,
                  fontFamily: 'SpoqaHanSansNeo-Bold',
                  fontSize: 10,
                }}>
                수정
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {contacts.length === 0 ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('EditEmergencyContacts')}>
                <View
                  style={{
                    padding: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f0f0f0',
                    borderRadius: 25,
                    marginTop: 10,
                  }}>
                  <Text style={{color: '#000', fontSize: 16}}>
                    비상연락처를 추가해주세요
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              contacts.map((contact, index) => (
                <View
                  key={index}
                  style={{
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => callNumber(contact.phone)}>
                    <View style={styles.contents11}>
                      <Text style={styles.contactText}>{contact.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
        <View style={styles.contents2}>
          <Text style={{margin: 4, fontFamily: 'SpoqaHanSansNeo-Bold'}}>
            긴급 신고
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alginItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.contents11}
              onPress={() => callNumber('112')}>
              <Image
                source={require('../assets/images/police.png')} // 이미지 URL을 여기에 넣으세요.
                style={styles.image}
              />
              <Text style={styles.contactText}>112</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contents11}
              onPress={() => callNumber('110')}>
              <Image
                source={require('../assets/images/110.png')} // 이미지 URL을 여기에 넣으세요.
                style={styles.image}
              />
              <Text style={styles.contactText}>110</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alginItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.contents11}
              onPress={() => callNumber('119')}>
              <Image
                source={require('../assets/images/fire.png')} // 이미지 URL을 여기에 넣으세요.
                style={styles.image}
              />
              <Text style={styles.contactText}>119</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contents11}
              onPress={() => howToReport()}>
              <Image
                source={require('../assets/images/report.png')} // 이미지 URL을 여기에 넣으세요.
                style={styles.image}
              />
              <Text style={styles.contactText}>신고방법</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible3}
              onRequestClose={() => handleModalToggle(!modalVisible3)}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Image
                    style={styles.image2}
                    source={screens[currentScreen]}
                  />
                  <View style={{flexDirection: 'row'}}>
                    {currentScreen > 0 && (
                      <TouchableOpacity
                        style={styles.navigationButton}
                        onPress={() => setCurrentScreen(currentScreen - 1)}>
                        <Text style={styles.navigationButtonText}>이전</Text>
                      </TouchableOpacity>
                    )}

                    {currentScreen < screens.length - 1 && (
                      <TouchableOpacity
                        style={styles.navigationButton}
                        onPress={() => setCurrentScreen(currentScreen + 1)}>
                        <Text style={styles.navigationButtonText}>다음</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleModalToggle(false)}>
                    <Text style={styles.cancelButtonText}>닫기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.contents4}
        onPress={() => changeService()}>
        <View>
          <Text
            style={isActive ? styles.activeServiceTitle : styles.serviceTitle}>
            {isActive ? '현재 위치를 공유중입니다.' : '안심귀가 서비스'}
          </Text>
          <Text style={styles.serviceText}>
            {isActive
              ? '집에 도착하시면 반드시 서비스를 종료하세요'
              : '안전하게 귀가하세요!'}
          </Text>
        </View>
        <LottieView
          style={{
            width: 70,
            height: 70,
          }}
          source={
            isActive
              ? require('../assets/lottie/process.json')
              : require('../assets/lottie/gps.json')
          }
          autoPlay
          loop={true}
        />
      </TouchableOpacity>

      <View style={styles.contentsContainer}>
        <View style={styles.contents3}>
          <Text style={{margin: 4, fontFamily: 'SpoqaHanSansNeo-Bold'}}>
            SOS 도구
          </Text>
          <View
            style={{
              flexWrap: 'wrap',
            }}>
            <TouchableOpacity onPress={() => callVideo2()}>
              <View style={styles.contents21}>
                <Text style={styles.contactText}>지인 가짜전화(통화)</Text>
                <Image
                  source={require('../assets/images/fakecall.png')} // 이미지 URL을 여기에 넣으세요.
                  style={styles.image3}
                />
              </View>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible2}
              onRequestClose={() => {
                setModalVisible2(!modalVisible2);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <VideoPlayer
                  source={{
                    uri: 'https://finalcow.s3.ap-northeast-2.amazonaws.com/videoTest.mp4',
                  }}
                  style={styles.fullScreenVideo}
                  onEnd={() => setModalVisible2(false)} // 비디오 재생이 끝나면 모달을 닫음
                />
              </View>
            </Modal>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={toggleTorch}>
                <View style={styles.contents26}>
                  <Image
                    // 조건에 따라 다른 이미지를 표시합니다.
                    source={
                      isTorchOn
                        ? require('../assets/images/flashOn.png')
                        : require('../assets/images/flashOff.png')
                    }
                    style={styles.image3}
                  />
                  <Text style={styles.contactText}>후레쉬</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={toggleSound} // 삼항 연산자를 사용하여 상태에 따라 함수 선택
                style={styles.button}>
                <View style={styles.contents26}>
                  <Image
                    source={require('../assets/images/SirenImage.png')}
                    style={styles.image3}
                  />
                  <Text style={styles.contactText}>
                    {isPlaying ? '사이렌 끄기' : '사이렌 울리기'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={EditTextMethod}>
              <View style={styles.contents31}>
                <Image
                  source={require('../assets/images/sendmessage.png')} // 이미지 URL을 여기에 넣으세요.
                  style={styles.image4}
                />
                <Text style={styles.contactText}>비상연락처</Text>
                <Text style={styles.contactText}>일괄 문자전송</Text>
              </View>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisibleText}
              onRequestClose={() => {
                setModalVisibleText(!modalVisibleText);
              }}>
              <View style={styles.centeredViewText}>
                <View style={styles.modalViewText}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisibleText(!modalVisibleText)}>
                    <Text style={styles.closeButtonText}>×</Text>
                  </TouchableOpacity>
                  <Text style={styles.modalTextText}>{message}</Text>
                  <Text style={styles.modalTextText2}>
                    비상연락처에 위 내용을 정말로 보내시겠습니까?
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        marginBottom: 10,
                        paddingHorizontal: 10,
                        fontWeight: 'bold',
                      }}>
                      수정
                    </Text>
                    <TextInput
                      style={styles.textInputText}
                      onChangeText={setMessage}
                      value={message}
                      placeholder="메시지 내용을 수정하세요."
                    />
                  </View>
                  <View style={styles.buttonContainerText}>
                    <TouchableOpacity
                      style={styles.sendButton}
                      onPress={handleSendMessage}>
                      <Text style={styles.buttonText}>보내기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
