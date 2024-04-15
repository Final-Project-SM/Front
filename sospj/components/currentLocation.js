import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from "react-native-geolocation-service";
import axios from 'axios';
import { REACT_APP_KAKAO_REST_KEY } from '@env';

const CurrentLocation = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('주소를 불러오는 중...');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse');
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
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log("위치 정보 접근 권한 거부");
        return;
      }
    }
    getLocation();
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setPosition(position);
        convertToAddress(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const convertToAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`, {
        headers: { Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_KEY}` },
      });
      const addressName = response.data.documents[0].address
        ? response.data.documents[0].address.address_name
        : '주소를 찾을 수 없습니다.';
      setAddress(addressName);
    } catch (error) {
      console.error('주소 변환 중 오류 발생:', error);
      setAddress('주소 변환에 실패했습니다.');
    }
  };

  useEffect(() => {
    requestLocationPermission();
    const locationInterval = setInterval(() => {
      getLocation(); // Call getLocation every 10 seconds
    }, 10000);

    return () => clearInterval(locationInterval); // Cleanup the interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'SpoqaHanSansNeo-Medium'}}>현재 사용자 위치 : {address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CurrentLocation;
