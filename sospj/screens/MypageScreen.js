import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import {useUser} from '../components/public/UserContext';
import {nfcAxios} from '../API/requestNode';
import {generateRandomString} from '../util/function/random';
import styles from '../styleFolder/MypageScreenStyles'; // 새로운 스타일 파일 가져오기

/**
 * 마이페이지 화면 컴포넌트
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {object} props.navigation - 내비게이션 객체
 * @returns {JSX.Element} MypageScreen 컴포넌트
 */
function MypageScreen({navigation}) {
  const {user} = useUser();
  const userName = user.name; // 사용자 이름은 변수로 관리하거나 props, state 등으로 받을 수 있습니다.
  const [modalVisible, setModalVisible] = useState(false);
  const [nfcModalVisible, setNfcModalVisible] = useState(false);
  const [status, setStatus] = useState('');

  /**
   * NFC 등록 처리 함수
   * @param {string} type - NFC 등록 타입
   */
  const handleRegisterNFC = async type => {
    setNfcModalVisible(true);
    setStatus('NFC 등록 중...');
    console.log(`NFC 등록 타입: ${type}`); // 파라미터 로그 출력
    try {
      const random = generateRandomString();
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([
        Ndef.uriRecord(`sospj://test/nfc?param1=${random}&type=${type}`),
      ]);

      if (bytes) {
        await NfcManager.ndefHandler // STEP 2
          .writeNdefMessage(bytes); // STEP 3
      }
      setStatus('성공');
      await nfcAxios.nfcInsert({id: user.id, nfcid: random});
    } catch (ex) {
      setStatus('다시 시도해주세요');
      console.log(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
      setTimeout(() => {
        setNfcModalVisible(false); // NFC 스캔 완료 후 모달 자동 닫기
      }, 5000); // 스캔 완료 메시지를 2초간 표시
    }
  };

  const handlePathCheck = () => {
    setModalVisible(true);
  };

  const handleCheckMyPath = () => {
    setModalVisible(false);
    navigation.navigate('MyPathScreen', {id: user.id});
  };

  const handleCheckRegisteredPeople = () => {
    setModalVisible(false);
    navigation.navigate('WhoRegister'); // 나를 등록한 사람들 확인하기 화면으로 이동
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
          style={styles.buttonStyle3}
          onPress={() => navigation.navigate('VoiceData')}>
          <Image
            style={styles.buttonImage}
            source={require('../assets/images/voice2.png')}
          />
          <Text style={styles.buttonText}>신고정보</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyle1} onPress={handlePathCheck}>
          <Image
            style={styles.buttonImage}
            source={require('../assets/images/path.png')}
          />
          <Text style={styles.buttonText}>동선 확인하기</Text>
        </TouchableOpacity>
        <View style={styles.buttonStyle5}>
          <TouchableOpacity
            style={styles.buttonStyle2}
            onPress={() => handleRegisterNFC('case')}>
            <Image
              style={styles.buttonImage2}
              source={require('../assets/images/case2.png')}
            />
            <Text style={styles.buttonText}>케이스 등록하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle4}
            onPress={() => handleRegisterNFC('bracelet')}>
            <Image
              style={styles.buttonImage2}
              source={require('../assets/images/wristband.png')}
            />
            <Text style={styles.buttonText}>팔찌 등록하기</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCheckMyPath}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/purpose2.png')}
                />
                <Text style={styles.modalButtonText}>내 동선 확인하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton2}
                onPress={handleCheckRegisteredPeople}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/peoples.png')}
                />
                <Text style={styles.modalButtonText}>나를 등록한 사람들</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={nfcModalVisible}
          onRequestClose={() => {
            setNfcModalVisible(!nfcModalVisible);
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
                onPress={() => setNfcModalVisible(false)}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default MypageScreen;
