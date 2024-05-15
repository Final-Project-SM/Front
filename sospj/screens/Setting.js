import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Modal,
} from 'react-native';
import {removeStorage} from '../util/function/asyncStorage';
import styles from '../styleFolder/SettingStyles'; // 새로운 스타일 파일 가져오기

/**
 * 설정 화면 컴포넌트
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {object} props.navigation - 내비게이션 객체
 * @returns {JSX.Element} Setting 컴포넌트
 */
const Setting = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);

  /**
   * 프리미엄 서비스 모달을 토글하는 함수
   * @param {boolean} visible - 모달 가시성 여부
   */
  const handleModalToggle = visible => {
    setModalVisible(visible);
    setCurrentScreen(0); // 모달을 열 때 항상 첫 번째 스크린으로 초기화
  };

  /**
   * 도움말 모달을 토글하는 함수
   * @param {boolean} visible - 모달 가시성 여부
   */
  const handleModalToggle2 = visible => {
    setModalVisible2(visible);
    setCurrentScreen(0); // 모달을 열 때 항상 첫 번째 스크린으로 초기화
  };

  const screens = [require('../assets/images/suports.png')];
  const screens2 = [
    require('../assets/images/helps/001.png'),
    require('../assets/images/helps/002.png'),
    require('../assets/images/helps/003.png'),
    require('../assets/images/helps/004.png'),
    require('../assets/images/helps/005.png'),
    require('../assets/images/helps/006.png'),
    require('../assets/images/helps/007.png'),
  ];

  /**
   * URL 링크를 여는 함수
   * @param {string} url - 열 URL
   */
  const openLink = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Can't open URI: " + url);
      }
    });
  };

  /**
   * 로그아웃 처리 함수
   */
  const logOut = () => {
    removeStorage('user');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Options</Text>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleModalToggle(true)}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/4400/4400740.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.itemText}>프리미엄 서비스</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => handleModalToggle(!modalVisible)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image style={styles.image2} source={screens[currentScreen]} />
              <View style={{flexDirection: 'row'}}>
                {currentScreen > 0 && (
                  <TouchableOpacity
                    style={styles.navigationButton}
                    onPress={() => setCurrentScreen(currentScreen - 1)}>
                    <Text style={styles.navigationButtonText}>이전</Text>
                  </TouchableOpacity>
                )}
                {currentScreen < screens.length - 1 && (
                  <TouchableOpacity
                    style={styles.navigationButton}
                    onPress={() => setCurrentScreen(currentScreen + 1)}>
                    <Text style={styles.navigationButtonText}>다음</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleModalToggle(false)}>
                <Text style={styles.cancelButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleModalToggle2(true)}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/4502/4502682.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.itemText}>도움말</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => handleModalToggle(!modalVisible2)}>
          <View style={styles.centeredView2}>
            <View style={styles.modalView2}>
              <Image style={styles.image22} source={screens2[currentScreen]} />
              <View style={{flexDirection: 'row'}}>
                {currentScreen > 0 && (
                  <TouchableOpacity
                    style={styles.navigationButton}
                    onPress={() => setCurrentScreen(currentScreen - 1)}>
                    <Text style={styles.navigationButtonText}>이전</Text>
                  </TouchableOpacity>
                )}
                {currentScreen < screens2.length - 1 && (
                  <TouchableOpacity
                    style={styles.navigationButton}
                    onPress={() => setCurrentScreen(currentScreen + 1)}>
                    <Text style={styles.navigationButtonText}>다음</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleModalToggle2(false)}>
                <Text style={styles.cancelButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.itemContainer2}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/4262/4262486.png',
              }}
              style={styles.icon}
            />
            <Text style={styles.itemText}>문의하기</Text>
          </View>
          <View style={styles.socialIcons}>
            <TouchableOpacity
              onPress={() => openLink('https://www.instagram.com/syong._.00')}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/2111/2111463.png',
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openLink('https://open.kakao.com/o/gRAbKbG')}>
              <Image
                source={require('../assets/images/kakao.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.itemContainer} onPress={() => logOut()}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3683/3683211.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.itemText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Setting;
