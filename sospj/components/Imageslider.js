import React from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import Swiper from 'react-native-swiper';

const images = [
  'https://previews.123rf.com/images/merggy/merggy1610/merggy161000016/65130940-%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4-%EA%B2%A8%EC%9A%B8-%EC%95%84%EC%B9%A8-%EC%82%B0%EC%9D%98-%EA%B7%B8%EB%A6%BC-%EA%B0%80%EB%A1%9C-%EB%B0%B0%EA%B2%BD.jpg',
  'https://previews.123rf.com/images/merggy/merggy1610/merggy161000016/65130940-%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4-%EA%B2%A8%EC%9A%B8-%EC%95%84%EC%B9%A8-%EC%82%B0%EC%9D%98-%EA%B7%B8%EB%A6%BC-%EA%B0%80%EB%A1%9C-%EB%B0%B0%EA%B2%BD.jpg',
  'https://placeimg.com/640/480/any',
];

const ImageSlider = () => {
  const handlePress = () => {
    Linking.openURL('https://naver.com');
  };

  return (
    <View style={{ height: 200 }}>
      <Swiper
        style={{ flex: 1 }}
        showsButtons={false}
        autoplay={false}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          margin: 3,
          backgroundColor: 'rgba(255,255,255,0.5)',
          position: 'absolute',
          bottom: 10,
          right: 5,
        }}
        activeDotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          margin: 3,
          backgroundColor: '#FFFFFF',
          position: 'absolute',
          bottom: 10,
          right: 5,
        }}
      >
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={handlePress} style={{ flex: 1 }}>
            <Image source={{ uri: image }} style={{ flex: 1 }} />
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
};

export default ImageSlider;
