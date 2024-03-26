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
    { name: '엄마', phone: '010-2680-9361' ,ImageUrl : 'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/263/68b88ea1c2c2de21542c38c498564786_res.jpeg'},
    { name: '아빠', phone: '010-3643-5995', ImageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa86TCWimid3nQI58oWcctSZ6sQa1Vx4g-chLGoi97yw&s' },
    { name: '여자친구', phone: '555-555-5555' ,ImageUrl : 'https://img.vogue.co.kr/vogue/2023/12/style_657ff6f175a7f-1126x1400.jpg'},
    { name: '친구1', phone: '666-666-6666' ,ImageUrl : 'https://i.namu.wiki/i/OO_8Mm_ASE9VmX7T-Bjeu0kvLcDBA6zA3yh7P6kW5tLQ2z5U5tY5adfw4m_1vSieSVf086YNp2s8jfw0_gfeig.webp'},
    { name: '친구2', phone: '777-777-7777' ,ImageUrl : 'data:image/jpeg;base64,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'},
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
          <View style={styles.contactInfo}>
            <Image 
              source={{uri: contact.ImageUrl}}
              style={styles.contactImage} 
            />
            <Text style={styles.contactText}>{contact.name}</Text>
            <Text style={styles.contactText2}>{contact.phone}</Text>

          </View>
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