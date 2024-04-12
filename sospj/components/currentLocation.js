import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from "react-native-geolocation-service"
import axios from 'axios';
import { REACT_APP_KAKAO_REST_KEY } from '@env';


const CurrentLocation = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('주소를 불러오는 중...'); // 도로명 주소 상태 추가

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse');
      getLocation();
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "위치 정보 접근 권한",
          message: "앱에서 위치 정보 접근 권한이 필요합니다.",
          buttonNeutral: "나중에",
          buttonNegative: "취소",
          buttonPositive: "확인"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        console.log("위치 정보 접근 권한 거부");
      }
    }
  };

  const changeToDoSi = (address) => {
    const doMapping = {
      '서울': '서울특별시',
      '부산': '부산광역시',
      '대구': '대구광역시',
      '인천': '인천광역시',
      '광주': '광주광역시',
      '대전': '대전광역시',
      '울산': '울산광역시',
      '세종': '세종특별자치시',
      '경기': '경기도',
      '강원': '강원도',
      '충북': '충청북도',
      '충남': '충청남도',
      '전북': '전라북도',
      '전남': '전라남도',
      '경북': '경상북도',
      '경남': '경상남도',
      '제주': '제주특별자치도'
    };
  
    // '도'와 '시'를 포함하여 그 뒤의 주소까지 모두 추출합니다.
    const regex = /^([가-힣]+)\s+([가-힣]+시)\s*(.*)/;
    const match = address.match(regex);
    
    if (match) {
      const stateShort = match[1]; // 줄임말 '도'
      const city = match[2]; // '시'
      
      // '도' 부분을 매핑 테이블을 사용하여 전체 이름으로 변환합니다.
      const fullStateName = doMapping[stateShort] || stateShort; 
      
      // 변환된 '도', '시', 그리고 나머지 주소를 결합합니다.
      const fullAddress = `${fullStateName} ${city}`.trim();
      
      console.log(fullAddress); // 변환된 전체 주소를 출력합니다.
    }
  }
  
  


  const convertToAddress = async (latitude, longitude) => {
    // 카카오 API를 사용한 주소 변환 함수
    try {
      const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`, {
        headers: { Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_KEY}` },
      });
      if (response.data.documents[0].address) {
        setAddress(response.data.documents[0].address.address_name);
      } else {
        setAddress('주소를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('주소 변환 중 오류 발생:', error);
      setAddress('주소 변환에 실패했습니다.');
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setPosition(position);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (position) {
      // 위치 정보가 있을 때 주소 변환 함수 호출
      convertToAddress(position.coords.latitude, position.coords.longitude);
    }
  }, [position]); // position이 변경될 때마다 주소 변환

  changeToDoSi(address)
  return (
    <View style={styles.container}>
      <Text style={{fontFamily : 'SpoqaHanSansNeo-Medium'}}>현재 사용자 위치 : {address}</Text>
      {/* <Text>위도: {position?.coords.latitude}, 경도: {position?.coords.longitude}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});

export default CurrentLocation;
