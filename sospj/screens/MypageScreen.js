import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

function MypageScreen({navigation}) {
  const userName = '이상용'; // 사용자 이름은 변수로 관리하거나 props, state 등으로 받을 수 있습니다.

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
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('ReportHistory')}>
          <Image
            style={styles.buttonImage}
            source={require('../assets/images/singo.png')}
          />
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
});

export default MypageScreen;
