import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { styles } from '../teststyle/test1';

/**
 * NFC 태그를 스캔하고, 읽기, 쓰기, 초기화하는 기능을 제공하는 컴포넌트입니다.
 * 
 * @param {Object} props 컴포넌트로 전달되는 props 객체입니다.
 * @param {function} props.onTagFound NFC 태그가 발견되었을 때 호출될 콜백 함수입니다.
 * @returns React 컴포넌트 요소를 반환합니다.
 */
const NfcScanner = ({ onTagFound }) => {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    NfcManager.start();
    return () => {
      NfcManager.stop();
      NfcManager.setEventListener(NfcTech.Ndef, 'stateChange', null);
      NfcManager.setEventListener(NfcTech.Ndef, 'discovered', null);
    };
  }, []);

  /**
   * NFC 태그 스캔을 시작하는 함수입니다.
   */
  const startScan = async () => {
    setIsScanning(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.log(tag);
      Alert.alert('Tag found', JSON.stringify(tag));

      if (onTagFound) {
        onTagFound(tag);
      }
    } catch (ex) {
      console.warn(ex);
      Alert.alert('Error', 'An error occurred');
    } finally {
      setIsScanning(false);
      NfcManager.cancelTechnologyRequest();
    }
  };

  /**
   * NFC 태그에 URL을 쓰는 함수입니다. 쓰기 성공 후 사용자에게 알림을 표시합니다.
   */
  const writeToTag = async () => {
    try {
      await NfcManager.start();
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const uri = 'https://www.google.com';
      const payload = [
        ...[0x01],
        ...Array.from(uri.slice('https://www.'.length)).map(c => c.charCodeAt(0))
      ];
      const record = {
        tnf: NfcTech.Ndef.TNF_WELL_KNOWN,
        type: [0x55],
        id: [],
        payload
      };
      await NfcManager.writeNdefMessage([record]);
      Alert.alert('Success', '태그에 쓰기 완료');
    } catch (ex) {
      console.warn(ex);
      Alert.alert('Error', 'An error occurred while writing to the tag');
    } finally {
      NfcManager.cancelTechnologyRequest();
      NfcManager.stop();
    }
  };

  /**
   * NFC 태그를 초기화하는 함수입니다. 초기화 성공 후 사용자에게 알림을 표시합니다.
   */
  const initializeTag = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      await NfcManager.writeNdefMessage([]);
      Alert.alert('Success', 'NFC tag has been initialized');
    } catch (ex) {
      console.warn(ex);
      Alert.alert('Error', 'An error occurred while initializing the tag');
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {isScanning ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Scanning for NFC tag...</Text>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.nfcSc} onPress={startScan}>
            <Text>Start Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nfcSc} onPress={writeToTag}>
            <Text>Write to Tag</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nfcSc} onPress={initializeTag}>
            <Text>Initialize Tag</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default NfcScanner;
