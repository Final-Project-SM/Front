import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  TextInput,
  Modal,
} from 'react-native';
import MapComponent from '../map/MapComponent';
import {WebView} from 'react-native-webview';
import FetchDataComponent from '../API/FetchDataComponent';
import {
  REACT_APP_API_KEY,
  REACT_APP_KAKKO_KEY,
  REACT_APP_KAKAO_REST_KEY,
} from '@env'; // react-native-dotenv를 통해 환경 변수 불러오기
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import styles from '../styleFolder/MapScreenStyles'; // 새로운 스타일 파일 가져오기

/**
 * 지도 화면 컴포넌트
 * @returns {JSX.Element} MapScreen 컴포넌트
 */
function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentX, setCurrentX] = useState('null');
  const [currentY, setCurrentY] = useState('null');
  const [fireplacemarker, setFireplacemarker] = useState([]);
  const [category, setCategory] = useState('null');
  const [modalVisible, setModalVisible] = useState(false);

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

  /**
   * 카테고리에 따라 데이터를 불러오는 함수
   * @param {string} query - 검색할 키워드
   * @param {function} setCategoryCallback - 카테고리 설정 콜백 함수
   */
  const fetchData = async (query, setCategoryCallback) => {
    setCategoryCallback();
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?y=${
          currentLocation.latitude
        }&x=${currentLocation.longitude}&radius=2000&query=${encodeURIComponent(
          query,
        )}`,
        {
          headers: {
            Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_KEY}`,
          },
        },
      );

      const markers = response.data.documents.map(document => ({
        name: document.place_name,
        latitude: parseFloat(document.y),
        longitude: parseFloat(document.x),
      }));
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
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.titleStyle}>내 근처 안전쉼터 맵</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => fetchData('소방서', () => setCategory('fire'))}
          style={styles.button}>
          <Image
            source={require('../assets/images/fire.png')}
            style={styles.icon}
          />
          <Text style={{fontFamily: 'SpoqaHanSansNeo-Bold'}}>소방서</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => fetchData('경찰서', () => setCategory('police'))}
          style={styles.button}>
          <Image
            source={require('../assets/images/police.png')}
            style={styles.icon}
          />
          <Text style={{fontFamily: 'SpoqaHanSansNeo-Bold'}}>경찰서</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => fetchData('편의점', () => setCategory('store'))}
          style={styles.button}>
          <Image
            source={require('../assets/images/store.png')}
            style={styles.icon}
          />
          <Text style={{fontFamily: 'SpoqaHanSansNeo-Bold'}}>편의점</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => fetchData('병원', () => setCategory('hospital'))}
          style={styles.button}>
          <Image
            source={require('../assets/images/hospital.png')}
            style={styles.icon}
          />
          <Text style={{fontFamily: 'SpoqaHanSansNeo-Bold'}}>병원</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button}>
          <Image
            source={require('../assets/images/redicon.png')}
            style={styles.icon}
          />
          <Text style={{fontFamily: 'SpoqaHanSansNeo-Bold'}}>주의</Text>
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
              <View style={styles.colorRow}>
                <View style={[styles.colorBox, {backgroundColor: '#FF0000'}]} />
                <Text>빨간색 (Red): 매우 높은 위험 수준을 나타냅니다.</Text>
              </View>

              <View style={styles.colorRow}>
                <View style={[styles.colorBox, {backgroundColor: '#FFA500'}]} />
                <Text>주황색 (Orange): 높은 위험 수준을 나타냅니다.</Text>
              </View>

              <View style={styles.colorRow}>
                <View style={[styles.colorBox, {backgroundColor: '#FFFF00'}]} />
                <Text>노란색 (Yellow): 중간 위험 수준을 나타냅니다.</Text>
              </View>

              <View style={styles.colorRow}>
                <View style={[styles.colorBox, {backgroundColor: '#FFD700'}]} />
                <Text>
                  연한 주황색 (Light Orange): 낮은 위험 수준을 나타냅니다.
                </Text>
              </View>

              <View style={styles.colorRow}>
                <View style={[styles.colorBox, {backgroundColor: '#FF6347'}]} />
                <Text>
                  연한 빨간색 (Light Red): 매우 낮은 위험 수준을 나타냅니다.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonCloseText}>숨기기</Text>
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

export default MapScreen;
