import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';

function MypageScreen({navigation}) {
  const userName = '이상용'; // 사용자 이름은 변수로 관리하거나 props, state 등으로 받을 수 있습니다.
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('');
  const handleRegisterNFC = () => {
    setModalVisible(true);
    setStatus('NFC 등록 중...');
    setTimeout(() => {
      setStatus('NFC 스캔 완료!');
      setTimeout(() => {
        setModalVisible(false); // NFC 스캔 완료 후 모달 자동 닫기
      }, 2000); // 스캔 완료 메시지를 2초간 표시
    }, 10000); // 10초 후에 메시지 변경
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.welcomeText}>
          WELCOME <Text style={styles.userName}>{userName}</Text> {'>'}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('EditEmergencyContacts')}>
          <Image
            style={styles.buttonImage}
            source={require('../assets/images/callList.png')}
          />
          <Text style={styles.buttonText}>비상연락망 수정</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('VoiceData')}>
          <Image
            style={styles.buttonImage}
            source={require('../assets/images/voice2.png')}
          />
          <Text style={styles.buttonText}>음성데이터 확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('CaseStore')}>
          <Image
            style={styles.buttonImage}
            source={require('../assets/images/case2.png')}
          />
          <Text style={styles.buttonText}>케이스 구매</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('registerNFC')}>
          <Image
            style={styles.buttonImage}
            source={require('../assets/images/singo.png')}
          />
          <Text style={styles.buttonText}>NFC 등록하기</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleRegisterNFC}>
          <Image
            style={styles.buttonImage}
            source={require('../assets/images/singo.png')}
          />
          <Text style={styles.buttonText}>NFC 등록하기</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{status}</Text>
              <Image
                style={styles.image}
                source={require('../assets/images/nfcregister.png')}
              />
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  welcomeText: {
    color: '#81C784',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userName: {
    color: 'black', // 사용자 이름의 색상을 검정색으로 설정
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center', // 중앙 정렬
    height: 200,
  },
  buttonImage: {
    width: 80, // 이미지 크기 설정
    height: 80, // 이미지 크기 설정
    marginBottom: 10, // 텍스트와의 간격
  },
  buttonText: {
    color: 'black', // 텍스트 색상을 검정색으로 변경
    textAlign: 'center',
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20, // 이미지 아래에 여유 공간 추가
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MypageScreen;
