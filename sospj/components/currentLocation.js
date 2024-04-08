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

  return (
    <View style={styles.container}>
      <Text>현재 사용자 위치</Text>
      {/* <Text>위도: {position?.coords.latitude}, 경도: {position?.coords.longitude}</Text> */}
      <Text>주소: {address}</Text>
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
