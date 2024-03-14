import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정 화면</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.buttonText}>개인정보 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('VoiceData')}>
          <Text style={styles.buttonText}>음성데이터 확인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('EditEmergencyContacts')}>
          <Text style={styles.buttonText}>비상연락망 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('ReportHistory')}>
          <Text style={styles.buttonText}>신고내역 확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: '#007bff',
    borderRadius: 10, // 모서리를 둥글게
    flex: 1,
    marginHorizontal: 10, // 버튼 사이의 간격
    justifyContent :'center',
    textAlign: 'center',
    height:200,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default SettingsScreen;
