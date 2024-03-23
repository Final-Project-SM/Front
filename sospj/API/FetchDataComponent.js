// FetchDataComponent.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const FetchDataComponent = ({ apiUrl }) => {
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

export default FetchDataComponent;
