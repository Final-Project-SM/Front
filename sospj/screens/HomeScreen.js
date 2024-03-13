import React from 'react';
import { View, Text, Button, ScrollView, Linking, Alert, Pressable, TouchableOpacity } from 'react-native';
import styles from '../teststyle/HomeStyle';
import NfcScanner from '../NFC/nfcScanner';

// Your component code remains the same, just remove the styles object and its declaration.


function callNumber(phoneNumber) {
  // 전화번호에서 하이픈('-') 제거
  const cleanPhoneNumber = phoneNumber.replace(/-/g, '');

  // 전화 걸기
  Linking.openURL(`tel:${cleanPhoneNumber}`);
}

function HomeScreen({ navigation }) {
  // 이름과 연락처 정보를 포함하는 배열
  const contacts = [
    { name: '엄마', phone: '010-2680-9361' },
    { name: '아빠', phone: '010-3643-5995' },
    { name: '여자친구', phone: '555-555-5555' },
    { name: '친구1', phone: '666-666-6666' },
    { name: '친구2', phone: '777-777-7777' },
  ];

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.row1}>
      <Text style={styles.header}>Make world safely</Text>
      
      <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? '#0056b3' : '#007bff' }
      ]}
      onPress={() => navigation.navigate('Login')}
    >
      {({ pressed }) => (
        <Text style={styles.text}>
          {pressed ? '로그인 중...' : '로그인'}
        </Text>
      )}
    </Pressable>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>이름</Text>
        <Text style={styles.value}>: 이상용</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>전화번호</Text>
        <Text style={styles.value}>: 010-2680-9361</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {contacts.map((contact, index) => (
          <View key={index} style={styles.contactItem}>
            <Text style={styles.contactText}>{contact.name}: {contact.phone}</Text>
            <Button
              title="Call"
              onPress={() => callNumber(contact.phone)}
            />
          </View>
        ))}
      </ScrollView>
     {/* 112와 119에 전화를 걸 수 있는 버튼 추가 */}
    <View style={styles.emergencyButtonsContainer}>
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
      <NfcScanner onTagFound={(tag) => console.log(tag)} />
    </View>
  );
}



export default HomeScreen;
