import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';

const {width} = Dimensions.get('window'); // 디바이스의 너비를 가져옵니다.

function StartingHelpScreen({navigation}) {
  // 로컬 이미지 리소스
  const images = [
    require('../assets/images/helps/001.png'),
    require('../assets/images/helps/002.png'),
    require('../assets/images/helps/003.png'),
    require('../assets/images/helps/004.png'),
    require('../assets/images/helps/005.png'),
    require('../assets/images/helps/006.png'),
    require('../assets/images/helps/007.png'),
  ];

  // 버튼 클릭 시 링크 열기
  const openLink = url => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Can't handle url: " + url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal // 수평 스크롤 활성화
        pagingEnabled // 페이지처럼 넘기기 활성화
        showsHorizontalScrollIndicator={false} // 스크롤바 표시 비활성화
      >
        {images.map((image, index) => (
          <View style={styles.imageContainer} key={index}>
            <Image source={image} style={styles.image} />
            <Text style={styles.imageNumber}>{`${index + 1}/${
              images.length
            }`}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.container1}>
        <View style={{backgroundColor: '#D3D3D3', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() =>
              openLink(
                'https://play.google.com/store/apps/details?id=net.daum.android.map&pcampaignid=web_share',
              )
            }>
            <Image
              source={require('../assets/images/kakaomap.png')}
              style={styles.image1}
            />
          </TouchableOpacity>
          <Text>설치</Text>
        </View>
        <View style={{backgroundColor: '#ADD8E6', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() =>
              openLink(
                'https://minecase.com/product/detail.html?product_no=16958&cate_no=777&display_group=1',
              )
            }>
            <Image
              source={require('../assets/images/case.png')}
              style={styles.image1}
            />
          </TouchableOpacity>
          <Text>구매</Text>
        </View>
        <View style={{backgroundColor: '#FFFDD0', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => openLink('https://www.sc.or.kr/')}>
            <Image
              source={require('../assets/images/savethechildren.png')}
              style={styles.image1}
            />
          </TouchableOpacity>
          <Text>후원</Text>
        </View>
        <View style={{backgroundColor: '#FFB6C1', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => openLink('https://map.kakao.com/')}>
            <Image
              source={require('../assets/images/kakao.png')}
              style={styles.image1}
            />
          </TouchableOpacity>
          <Text>가입</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>닫기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
  },
  imageContainer: {
    width: width, // 이미지 컨테이너 너비를 디바이스 너비로 설정
    height: 400, // 이미지 컨테이너 높이
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'white',
    marginTop: 60,
  },
  image: {
    width: '100%', // 이미지 너비를 컨테이너 너비에 맞춤
    height: '100%', // 이미지 높이를 컨테이너 높이에 맞춤
  },
  imageNumber: {
    position: 'absolute',
    right: 10, // 우측 하단 위치
    bottom: 10, // 우측 하단 위치
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 텍스트가 눈에 띄도록 반투명 검은 배경
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  button: {
    minWidth: 300,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  container1: {
    flexDirection: 'row', // 가로로 배열하기 위해 flexDirection을 'row'로 설정
    justifyContent: 'space-around', // 버튼 사이에 균일한 간격을 두기 위해 사용
    alignItems: 'center', // 세로 축 기준으로 중앙 정렬
    marginBottom: 40,
  },
  button1: {
    width: 50, // 버튼의 너비
    height: 50, // 버튼의 높이
    margin: 10,
    marginBottom: 4,
  },
  image1: {
    width: '100%', // 이미지가 버튼 크기에 꽉 차도록 설정
    height: '100%', // 이미지가 버튼 크기에 꽉 차도록 설정
    resizeMode: 'contain', // 이미지 비율을 유지하면서 버튼 내에 맞춤
  },
});

export default StartingHelpScreen;
