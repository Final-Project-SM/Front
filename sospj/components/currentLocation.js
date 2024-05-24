import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {REACT_APP_KAKAO_REST_KEY} from '@env';

/**
 * CurrentLocation 컴포넌트
 *
 * 사용자의 현재 위치를 가져와 주소로 변환하여 화면에 표시하는 컴포넌트입니다.
 *
 * @component
 * @returns {JSX.Element} CurrentLocation 컴포넌트
 */
const CurrentLocation = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('주소를 불러오는 중...');

  /**
   * 위치 정보 접근 권한을 요청하는 함수
   *
   * iOS와 Android 플랫폼에 맞게 권한 요청을 처리합니다.
   * 권한이 허용된 경우 위치 정보를 가져옵니다.
   */
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse');
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 정보 접근 권한',
          message: '앱에서 위치 정보 접근 권한이 필요합니다.',
          buttonNeutral: '나중에',
          buttonNegative: '취소',
          buttonPositive: '확인',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('위치 정보 접근 권한 거부');
        return;
      }
    }
    getLocation();
  };

  /**
   * 사용자의 현재 위치를 가져오는 함수
   *
   * 위치 정보를 가져온 후 해당 위치를 주소로 변환합니다.
   */
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setPosition(position);
        convertToAddress(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  /**
   * 좌표를 주소로 변환하는 함수
   *
   * @param {number} latitude - 위도
   * @param {number} longitude - 경도
   */
  const convertToAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
        {
          headers: {Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_KEY}`},
        },
      );
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
      getLocation(); // 10초마다 위치 정보를 가져옴
    }, 10000);

    return () => clearInterval(locationInterval); // 컴포넌트가 언마운트될 때 인터벌 정리
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'SpoqaHanSansNeo-Medium'}}>
        현재 사용자 위치 : {address}
      </Text>
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
