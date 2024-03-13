import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Linking, Alert, Pressable } from 'react-native';
import NfcScanner from '../NFC/nfcScanner';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        <Text style={styles.label}>이름이</Text>
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

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    margin:10
  },
  scrollView: {
    width: '100%',
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactText: {
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  row1: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'space-between',
    width:'100%'
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    marginLeft: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
  emergencyButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  emergencyButton: {
    padding: 10,
    borderRadius: 5,
    margin:20,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
