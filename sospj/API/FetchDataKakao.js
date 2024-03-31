import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { REACT_APP_KAKAO_REST_KEY } from '@env';

const FetchDataKakao = ({ apiUrl }) => {
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.text())
      .then((text) => {
        console.log(text); // 응답 데이터 콘솔에 출력
      })
      .catch((error) => {
        console.error(error);
      });
  }, [apiUrl]);
  return (
    <View>
      <Text>Data fetched</Text>
    </View>
  );
}

export default FetchDataKakao;
