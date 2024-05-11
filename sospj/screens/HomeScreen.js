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
} from 'react-native';
//import styles from '../teststyle/HomeStyle';
import styles from '../teststyle/HomeStyle copy';
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
import Graph from '../components/graph';
import CurrentTime from '../components/CurrentTime';
import LottieView from 'lottie-react-native';
// 예시 그래프 데이터
const graphData = {
  labels: ['강남', '은평', '마포', '잠실', '광화문', '강북'],
  datasets: [
    {
      data: [7, 10, 7, 24, 3, 15], // 각 지역별 사고 횟수
    },
  ],
};
function callNumber(phoneNumber) {
  const cleanPhoneNumber = phoneNumber.replace(/-/g, '');
  Linking.openURL(`tel:${cleanPhoneNumber}`);
}

function HomeScreen({navigation}) {
  const {user} = useUser();
  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isActive, setIsActive] = useState(false); // 버튼 상태 관리
  const [news, setNews] = useState([]);
  const [contacts, setContacts] = useState([]);
  const loadData = async () => {
    const data = await userAxios.main({id: user.id});
    if (data.sc == 200) {
      console.log(data.list);
      setNews(data.news);
      setContacts(data.list);
    }
  };
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
  const handleModalToggle = visible => {
    setModalVisible3(visible);
    setCurrentScreen(0); // 모달을 열 때 항상 첫 번째 스크린으로 초기화
  };
  const howToReport = () => {
    setModalVisible3(true);
  };
  const handlePress = newsUrl => {
    Linking.openURL(newsUrl);
  };
  const callVideo = phone => {
    // 전화 걸기 로직 (여기서는 모달을 표시하는 것으로 대체)
    setModalVisible(true);
  };
  const callVideo2 = phone => {
    // 전화 걸기 로직 (여기서는 모달을 표시하는 것으로 대체)
    setModalVisible2(true);
  };
  const changeService = () => {
    setIsActive(!isActive);
  };
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    console.log('Video loaded!');
    setIsVideoLoaded(true); // 비디오가 로드되었음을 상태로 설정
  };
  const sendSosMessage = async () => {
    await userAxios.sns({id: user.id});
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
                style={styles2.imageBackground}>
                <View style={styles2.newscontainer}>
                  <Text style={styles2.text}>{news.title}</Text>
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
            <TouchableOpacity onPress={() => callVideo()}>
              <View style={styles.contents21}>
                <Text style={styles.contactText}>112 가짜전화(통화)</Text>
                <Image
                  source={require('../assets/images/police.png')} // 이미지 URL을 여기에 넣으세요.
                  style={styles.image3}
                />
              </View>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <VideoPlayer
                  source={{
                    uri: 'https://finalcow.s3.ap-northeast-2.amazonaws.com/tetetete.mp4',
                  }}
                  style={styles2.fullScreenVideo}
                  onEnd={() => setModalVisible(false)} // 비디오 재생이 끝나면 모달을 닫음
                />
              </View>
            </Modal>
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
              <Text>hello</Text>
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
                  style={styles2.fullScreenVideo}
                  onEnd={() => setModalVisible2(false)} // 비디오 재생이 끝나면 모달을 닫음
                />
              </View>
            </Modal>
            <TouchableOpacity onPress={sendSosMessage}>
              <View style={styles.contents31}>
                <Image
                  source={require('../assets/images/sendmessage.png')} // 이미지 URL을 여기에 넣으세요.
                  style={styles.image4}
                />
                <Text style={styles.contactText}>비상연락처</Text>
                <Text style={styles.contactText}>일괄 문자전송</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          borderTopColor: 'white',
          borderTopWidth: 1,
          borderBottomColor: 'white',
          borderBottomWidth: 1,
          margin: 20,
          marginBottom: 10,
          width: '100%',
        }}></View>
      <Graph />
    </ScrollView>
  );
}
const styles2 = StyleSheet.create({
  imageBackground: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50, // Adjust the value to position your text
    height: 60,
  },
  newscontainer: {
    position: 'absolute', // 부모 요소에 대해 절대 위치 설정
    bottom: 20,
    left: 130,
    width: 200,
    marginTop: 20,
  },
  text: {
    fontSize: 10,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  fullScreenVideo: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
