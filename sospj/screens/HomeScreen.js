import React from 'react';
import { View, Text, Button, ScrollView, Linking, Image, Alert, Pressable, TouchableOpacity } from 'react-native';
//import styles from '../teststyle/HomeStyle';
import styles from '../teststyle/HomeStyle copy';
import NfcScanner from '../NFC/nfcScanner';
import { BarChart } from 'react-native-chart-kit'; // 그래프를 위한 라이브러리


// 예시 그래프 데이터
const graphData = {
  labels: ['강남', '은평', '마포', '수원', '광주'],
  datasets: [
    {
      data: [7, 10, 7, 24, 3, 15], // 각 지역별 사고 횟수
    },
  ],
};


function callNumber(phoneNumber) {
  const cleanPhoneNumber = phoneNumber.replace(/-/g, '');
  Linking.openURL(`tel:${cleanPhoneNumber}`);
}

function HomeScreen({ navigation }) {
  const contacts = [
    { name: '엄마', phone: '010-2680-9361' },
    { name: '아빠', phone: '010-3643-5995' },
    { name: '여자친구', phone: '555-555-5555' },
    { name: '친구1', phone: '666-666-6666' },
    { name: '친구2', phone: '777-777-7777' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.headerImage}
        source={{ uri: 'https://source.unsplash.com/random/400x200?emergency' }} // 예시 이미지 URL
      />
      <Text style={styles.headerText}>Make World Safely</Text>
        {contacts.map((contact, index) => (
          <View key={index} style={styles.contactItem}>
            <Text style={styles.contactText}>{contact.name}: {contact.phone}</Text>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => callNumber(contact.phone)}
            >
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>

          </View>
        ))}

      <View style={styles.police} >
        <TouchableOpacity
          style={[styles.emergencyButton, {backgroundColor: '#db2828'}]}
          onPress={() => callNumber('112')}
        >
          <Text style={styles.emergencyButtonText}>112에 전화하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.emergencyButton, {backgroundColor: '#f2711c'}]}
          onPress={() => callNumber('119')}
        >
          <Text style={styles.emergencyButtonText}>119에 전화하기</Text>
        </TouchableOpacity>
      </View> 
      <Text style={styles.emergencyButtonText}>지역별 사고 현황 추이</Text>
      <BarChart
        data={graphData}
        width={400} // 그래프의 너비
        height={220} // 그래프의 높이
        yAxisLabel="" // Y축 라벨
        chartConfig={{
          backgroundColor: '#000000',
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          decimalPlaces: 0, // 소수점 자리수
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#26A69A',
          },
        }}
        verticalLabelRotation={0} // 라벨 회전 각도
      />
      <NfcScanner onTagFound={(tag) => console.log(tag)} />

    </ScrollView>
  );
}

export default HomeScreen;