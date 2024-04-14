// MapScreen.js
import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, button, TouchableOpacity,PermissionsAndroid  } from 'react-native';
import MapComponent from '../map/MapComponent';
import MapComponent2 from '../map/MapComponent copy';
import {WebView} from 'react-native-webview';
import FetchDataComponent from '../API/FetchDataComponent';
import {REACT_APP_API_KEY} from '@env';
import { REACT_APP_KAKKO_KEY } from '@env'; // react-native-dotenv를 통해 환경 변수 불러오기
import { REACT_APP_KAKAO_REST_KEY } from '@env';
import axios from 'axios';
import Geolocation from "react-native-geolocation-service"



function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [currentX, setCurrentX] = useState('null')
  const [currentY, setCurrentY] = useState('null')
  const [fireplacemarker, setFireplacemarker] = useState([]);
  const [category, setCategory] = useState('null');

  //const apiUrl = `http://openapi.seoul.go.kr:8088/${REACT_APP_API_KEY}/xml/TbGiWardP/1/10/`; // 수정된 부분

  

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // 현재 위치가 변경되었는지 확인
        if (latitude !== currentX || longitude !== currentY) {
          setCurrentLocation({ latitude, longitude });
          setCurrentX(latitude);
          setCurrentY(longitude);
        }
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 1,
      }
    );
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [currentX, currentY]); // 의존성 배열에 currentX와 currentY 추가


  const fireplace = async () =>{
    const query = encodeURIComponent('소방서'); // 검색할 키워드를 URL 인코딩
    setCategory('fire');
  try {
    const response = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?y=${currentLocation.latitude}&x=${currentLocation.longitude}&radius=2000&query=${query}`, {
      headers: {
        Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_KEY}`, // 환경 변수에서 API 키를 가져옴
      },
    });

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


const police = async () =>{
  const query = encodeURIComponent('경찰서'); // 검색할 키워드를 URL 인코딩
  setCategory('police');
try {
  const response = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?y=${currentLocation.latitude}&x=${currentLocation.longitude}&radius=2000&query=${query}`, {
    headers: {
      Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_KEY}`, // 환경 변수에서 API 키를 가져옴
    },
  });
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

const store = async () =>{
  const query = encodeURIComponent('편의점'); // 검색할 키워드를 URL 인코딩
  setCategory('store');
try {
  const response = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?y=${currentLocation.latitude}&x=${currentLocation.longitude}&radius=2000&query=${query}`, {
    headers: {
      Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_KEY}`, // 환경 변수에서 API 키를 가져옴
    },
  });

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {currentLocation ? (
        <Text style={styles.title}>
          {currentLocation.latitude} / {currentLocation.longitude}
        </Text>
      ) : (
        <Text style={styles.title}>location undefined</Text>
      )}

      <View style={{flexDirection:'row'}}>
        <TouchableOpacity
        onPress={fireplace}
        style={{backgroundColor:'white', height:30, width:50, borderColor:'black', borderWidth:3}}
        >
          <Text>소방서</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={police}
        style={{backgroundColor:'white', height:30, width:50, borderColor:'black', borderWidth:3}}
        >
          <Text>경찰서</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={store}
        style={{backgroundColor:'white', height:30, width:50, borderColor:'black', borderWidth:3}}
        >
          <Text>편의점</Text>
        </TouchableOpacity>
      </View>

      <Text>Map Screen</Text>
      <MapComponent x={currentX} y={currentY} markers={fireplacemarker} currentX={currentX} currentY={currentY} category={category} />
      {/* <Text>test map2</Text>
      <MapComponent2/> */}
    </View>
  );
}
const styles = StyleSheet.create({
  mapView: {
    width: Dimensions.get('window').width,
    height: 750, // 높이를 350px로 설정
  },
  title: {
    textAlign: "center",
    fontSize: 12,
    margin: 15,
    color: "black",
    fontWeight: "600",
  },
});

export default MapScreen;
