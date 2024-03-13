/**
 * React와 React Native의 필요한 요소들을 임포트합니다.
 */
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

/**
 * react-native-nfc-manager 라이브러리에서 NfcManager와 NfcTech를 임포트합니다.
 */
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

/**
 * 외부 스타일 시트를 임포트합니다.
 */
import { styles } from '../teststyle/test1';

/**
 * NfcScanner 컴포넌트를 정의합니다.
 * NFC 태그를 찾았을 때 실행할 함수를 props로 받습니다.
 *
 * @param {Object} props 컴포넌트로 전달되는 props
 * @param {function} props.onTagFound NFC 태그가 발견되었을 때 실행될 콜백 함수
 */
const NfcScanner = ({ onTagFound }) => {
  /**
   * 컴포넌트가 마운트될 때 NFC Manager를 시작하고, 언마운트될 때 정리합니다.
   */
  useEffect(() => {
    // NFC 기능을 시작합니다.
    NfcManager.start();

    // 클린업 함수
    return () => {
      // NFC 기능을 중지하고, 이벤트 리스너를 정리합니다.
      NfcManager.stop();
      NfcManager.setEventListener(NfcTech.Ndef, 'stateChange', null);
      NfcManager.setEventListener(NfcTech.Ndef, 'discovered', null);
    };
  }, []);

  /**
   * NFC 태그 스캔을 시작하는 함수입니다.
   */
  const startScan = async () => {
    try {
      // NDEF 기술을 사용하여 NFC 스캔을 요청합니다.
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // NFC 태그 정보를 가져옵니다.
      const tag = await NfcManager.getTag();
      // 태그 정보를 콘솔에 출력합니다.
      console.log(tag);
      // 태그 정보를 사용자에게 보여주는 알림을 표시합니다.
      Alert.alert('Tag found', JSON.stringify(tag));

      // onTagFound 콜백이 제공되면, 태그 정보를 전달합니다.
      if (onTagFound) {
        onTagFound(tag);
      }
    } catch (ex) {
      // 오류 발생 시, 경고를 출력하고 사용자에게 알림을 표시합니다.
      console.warn(ex);
      Alert.alert('Error', 'An error occurred');
    } finally {
      // 스캔 요청을 취소하고 관련 리소스를 정리합니다.
      NfcManager.cancelTechnologyRequest();
    }
  };

  /**
   * "Start Scan" 버튼을 렌더링합니다.
   * 버튼 스타일은 외부 스타일 시트에서 가져옵니다.
   */
  return (
    <View>
      <TouchableOpacity style={styles.nfcSc} onPress={startScan}>
        <Text>Start Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * NfcScanner 컴포넌트를 내보냅니다.
 */
export default NfcScanner;
