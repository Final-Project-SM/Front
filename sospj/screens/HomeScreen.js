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
import NfcScanner from '../NFC/nfcScanner';
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
  
const news = [
  {
    title: '눈앞에 가상의 횡단보도를 만드니 밤길 사고 걱정 덜겠네',
    Url: 'https://m.hankookilbo.com/News/Read/A2023052517110002977',
  },
  {
    title: '화물차가 탑차 들이받아 1명 사망…밤길 교통사고 잇따라',
    Url: 'https://news.kbs.co.kr/news/pc/view/view.do?ncd=7776903',
  },
  {
    title: '함평군, 밤길 활주로형 횡단보도 설치',
    Url: 'https://www.gjdream.com/news/articleView.html?idxno=636887',
  },
  {
    title: '함평군, 밤길 활주로형 횡단보도 설치',
    Url: 'https://www.gjdream.com/news/articleView.html?idxno=636887',
  },
  {
    title: '함평군, 밤길 활주로형 횡단보도 설치',
    Url: 'https://www.gjdream.com/news/articleView.html?idxno=636887',
  },
];

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
  const {user,setUser} = useUser(); 
  Alert.alert(user.id)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

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

  const asdsad = async () => {
    const query = encodeURIComponent('소방서'); // 검색할 키워드를 URL 인코딩
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?y=37.2635727&x=127.0286009&radius=2000&query=${query}`,
        {
          headers: {
            Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_KEY}`, // 환경 변수에서 API 키를 가져옴
          },
        },
      );
      // 응답 데이터에서 각 위치의 위도와 경도 정보만 추출하여 로그에 출력
      response.data.documents.forEach(document => {
        console.log(
          `name : ${document.place_name}, Latitude: ${document.y}, Longitude: ${document.x}`,
        );
      });
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };
  asdsad();
  const contacts = [
    {name: '엄마', phone: '010-2680-9361'},
    {name: '아빠', phone: '010-3643-5995'},
    {name: '여자친구', phone: '555-555-5555'},
    {name: '친구1', phone: '666-666-6666'},
  ];

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    console.log('Video loaded!');
    setIsVideoLoaded(true); // 비디오가 로드되었음을 상태로 설정
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
              onPress={() => Linking.openURL(news.Url)}
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
              <Text style={styles.contactText}>112</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contents11}
              onPress={() => callNumber('110')}>
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
              style={styles.contents21}
              onPress={() => callNumber('119')}>
              <Text style={styles.contactText}>119</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.contentsContainer}>
        <View style={styles.contents1}>
          <Text style={{margin: 4, fontFamily: 'SpoqaHanSansNeo-Bold'}}>
            Fake전화
          </Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => callVideo()}>
              <View style={styles.contents21}>
                <Text style={styles.contactText}>112 가짜전화</Text>
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
                  source={require('../assets/video/tetetete.mp4')}
                  style={styles2.fullScreenVideo}
                  onEnd={() => setModalVisible(false)} // 비디오 재생이 끝나면 모달을 닫음
                />
              </View>
            </Modal>
            <TouchableOpacity onPress={() => callVideo2()}>
              <View style={styles.contents21}>
                <Text style={styles.contactText}>지인 가짜전화</Text>
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
                  source={require('../assets/video/videoTest.mp4')}
                  style={styles2.fullScreenVideo}
                  onEnd={() => setModalVisible2(false)} // 비디오 재생이 끝나면 모달을 닫음
                />
              </View>
            </Modal>
          </View>
        </View>
        <View style={styles.contents2}>
          <Text style={{margin: 4, fontFamily: 'SpoqaHanSansNeo-Bold'}}>
            SOS 도구
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
              <Text style={styles.contactText}>일괄 문자 전송</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contents11}
              onPress={() => callNumber('110')}>
              <Text style={styles.contactText}>미정</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alginItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.contents21}
              onPress={() => callNumber('119')}>
              <Text style={styles.contactText}>미정</Text>
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
          margin: 2,
          marginBottom: 10,
          width: '100%',
        }}></View>
      <CurrentLocation />
      <Text style={styles.emergencyButtonText}>지역별 사고 현황 추이</Text>
      <View style={{paddingRight: 20}}>
        <BarChart
          data={graphData}
          width={380} // 그래프의 너비
          height={220} // 그래프의 높이
          yAxisLabel="" // Y축 라벨
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#F0F0F0',
            backgroundGradientTo: '#E8F5E9',
            decimalPlaces: 0, // 소수점 자리수
            color: (opacity = 1) => `rgba(0, 200, 83, ${opacity})`, // 연두색을 포함한 데이터 라인 색상을 더 진하게 조정
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 검은색 라벨로 변경하여 흰색 계열 배경과 대비
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#009688', // 데이터 포인트에 사용될 더 진한 연두색 조정
            },
          }}
          verticalLabelRotation={0} // 라벨 회전 각도
        />
      </View>
      <NfcScanner onTagFound={tag => console.log(tag)} />
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
