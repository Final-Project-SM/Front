// MapScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  button,
  TouchableOpacity,
  PermissionsAndroid,
  TextInput,
  Modal,
} from 'react-native';
import MapComponent from '../map/MapComponent';
import {WebView} from 'react-native-webview';
import FetchDataComponent from '../API/FetchDataComponent';
import {REACT_APP_API_KEY} from '@env';
import {REACT_APP_KAKKO_KEY} from '@env'; // react-native-dotenv를 통해 환경 변수 불러오기
import {REACT_APP_KAKAO_REST_KEY} from '@env';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentX, setCurrentX] = useState('null');
  const [currentY, setCurrentY] = useState('null');
  const [fireplacemarker, setFireplacemarker] = useState([]);
  const [category, setCategory] = useState('null');
  const [modalVisible, setModalVisible] = useState(false);

  //const apiUrl = `http://openapi.seoul.go.kr:8088/${REACT_APP_API_KEY}/xml/TbGiWardP/1/10/`; // 수정된 부분

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // 현재 위치가 변경되었는지 확인
        if (latitude !== currentX || longitude !== currentY) {
          setCurrentLocation({latitude, longitude});
          setCurrentX(latitude);
          setCurrentY(longitude);
        }
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 1,
      },
    );
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [currentX, currentY]); // 의존성 배열에 currentX와 currentY 추가

  const fireplace = async () => {
    const query = encodeURIComponent('소방서'); // 검색할 키워드를 URL 인코딩
    setCategory('fire');
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?y=${currentLocation.latitude}&x=${currentLocation.longitude}&radius=2000&query=${query}`,
        {
          headers: {
            Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_KEY}`, // 환경 변수에서 API 키를 가져옴
          },
        },
      );

      //     // 응답 데이터에서 각 위치의 위도와 경도 정보만 추출하여 로그에 출력
      //     response.data.documents.forEach(document => {
      //       console.log(`name : ${document.place_name}, Latitude: ${document.y}, Longitude: ${document.x}`);
      //     });
      //   } catch (error) {
      //     console.error('Error fetching location data:', error);
      //   }
      // };
      // API 응답에서 위치 정보를 추출하여 상태에 저장
      const markers = response.data.documents.map(document => ({
        name: document.place_name,
        latitude: parseFloat(document.y), // 문자열을 숫자로 변환
        longitude: parseFloat(document.x),
      }));
      //console.log(markers);
      setFireplacemarker(markers);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const hospital = async () => {
    const query = encodeURIComponent('병원'); // 검색할 키워드를 URL 인코딩
    setCategory('hospital');
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?y=${currentLocation.latitude}&x=${currentLocation.longitude}&radius=2000&query=${query}`,
        {
          headers: {
            Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_KEY}`, // 환경 변수에서 API 키를 가져옴
          },
        },
      );

      //     // 응답 데이터에서 각 위치의 위도와 경도 정보만 추출하여 로그에 출력
      //     response.data.documents.forEach(document => {
      //       console.log(`name : ${document.place_name}, Latitude: ${document.y}, Longitude: ${document.x}`);
      //     });
      //   } catch (error) {
      //     console.error('Error fetching location data:', error);
      //   }
      // };
      // API 응답에서 위치 정보를 추출하여 상태에 저장
      const markers = response.data.documents.map(document => ({
        name: document.place_name,
        latitude: parseFloat(document.y), // 문자열을 숫자로 변환
        longitude: parseFloat(document.x),
      }));
      //console.log(markers);
      setFireplacemarker(markers);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const police = async () => {
    const query = encodeURIComponent('경찰서'); // 검색할 키워드를 URL 인코딩
    setCategory('police');
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?y=${currentLocation.latitude}&x=${currentLocation.longitude}&radius=2000&query=${query}`,
        {
          headers: {
            Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_KEY}`, // 환경 변수에서 API 키를 가져옴
          },
        },
      );
      // API 응답에서 위치 정보를 추출하여 상태에 저장
      const markers = response.data.documents.map(document => ({
        name: document.place_name,
        latitude: parseFloat(document.y), // 문자열을 숫자로 변환
        longitude: parseFloat(document.x),
      }));
      //console.log(markers);
      setFireplacemarker(markers);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  //   // 응답 데이터에서 각 위치의 위도와 경도 정보만 추출하여 로그에 출력
  //   response.data.documents.forEach(document => {
  //     console.log(`name : ${document.place_name}, Latitude: ${document.y}, Longitude: ${document.x}`);
  //   });
  // } catch (error) {
  //   console.error('Error fetching location data:', error);
  // }
  // };

  const store = async () => {
    const query = encodeURIComponent('편의점'); // 검색할 키워드를 URL 인코딩
    setCategory('store');
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?y=${currentLocation.latitude}&x=${currentLocation.longitude}&radius=2000&query=${query}`,
        {
          headers: {
            Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_KEY}`, // 환경 변수에서 API 키를 가져옴
          },
        },
      );

      // API 응답에서 위치 정보를 추출하여 상태에 저장
      const markers = response.data.documents.map(document => ({
        name: document.place_name,
        latitude: parseFloat(document.y), // 문자열을 숫자로 변환
        longitude: parseFloat(document.x),
      }));
      //console.log(markers);
      setFireplacemarker(markers);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={styles.titleStyle}>내 근처 안전쉼터 맵</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={fireplace} style={styles.button}>
          <Image
            source={require('../assets/images/fire.png')}
            style={styles.icon}
          />
          <Text>소방서</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={police} style={styles.button}>
          <Image
            source={require('../assets/images/police.png')}
            style={styles.icon}
          />
          <Text>경찰서</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={store} style={styles.button}>
          <Image
            source={require('../assets/images/store.png')}
            style={styles.icon}
          />
          <Text>편의점</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={hospital} style={styles.button}>
          <Image
            source={require('../assets/images/hospital.png')}
            style={styles.icon}
          />
          <Text>병원</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button}>
          <Image
            source={require('../assets/images/redicon.png')}
            style={styles.icon}
          />
          <Text>주의</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>
                최근 30일 동안의 신고가 들어온 지역을 표시하고 있습니다.
              </Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text>숨기기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <MapComponent
        x={currentX}
        y={currentY}
        markers={fireplacemarker}
        currentX={currentX}
        currentY={currentY}
        category={category}
      />
      {/* <Text>test map2</Text>
      <MapComponent2/> */}
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  mapView: {
    width: Dimensions.get('window').width,
    height: 750, // 높이를 350px로 설정
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
    margin: 15,
    color: 'black',
    fontWeight: '600',
  },
  button: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50, // Set width to fit the image size
    height: 50, // Set height to fit the image size
    marginHorizontal: 10,
  },
  icon: {
    width: 30, // Set as needed based on your design preference
    height: 30, // Maintain aspect ratio
    marginBottom: 5, // Space between icon and text
  },
  titleStyle: {
    color: '#81C784',
    fontSize: 20,
    fontFamily: 'SpoqaHanSansNeo-Bold',
    margin: 11,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default MapScreen;
