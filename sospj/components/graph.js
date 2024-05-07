import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {BarChart} from 'react-native-chart-kit';
import {request, PERMISSIONS} from 'react-native-permissions'; // 위치 권한 요청을 위한 import
import axios from 'axios';
import {REACT_APP_KAKAO_REST_KEY} from '@env';

const graph = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('주소를 불러오는 중...');
  const graphData = {
    labels: ['강남', '은평', '마포', '잠실', '광화문', '강북'],
    datasets: [
      {
        data: [7, 10, 7, 24, 3, 15], // 각 지역별 사고 횟수
      },
    ],
  };
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
      getLocation(); // Call getLocation every 10 seconds
    }, 10000);

    return () => clearInterval(locationInterval); // Cleanup the interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'SpoqaHanSansNeo-Medium'}}>
        현재 사용자 위치 : {address}
      </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
export default graph;
