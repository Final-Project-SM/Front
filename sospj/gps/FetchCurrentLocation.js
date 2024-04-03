import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const FetchCurrentLocation = () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (granted === 'granted') {
        console.log('위치 권한 허용됨');
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            // 카카오 API에 현재 위치 사용
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        console.log('위치 권한 거부됨');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View>
      <Text>현재 위치 정보를 불러옵니다...</Text>
    </View>
  );
};

export default FetchCurrentLocation;
