// MapScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import MapComponent from '../map/MapComponent';
import FetchDataComponent from '../API/FetchDataComponent';
import { REACT_APP_API_KEY } from '@env'; // react-native-dotenv를 통해 환경 변수 불러오기

function MapScreen() {
  const apiUrl = `http://openapi.seoul.go.kr:8088/${REACT_APP_API_KEY}/xml/TbGiWardP/1/10/`; // 수정된 부분

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Map Screen</Text>
      <MapComponent />
      <FetchDataComponent apiUrl={apiUrl} />
    </View>
  );
}

export default MapScreen;
