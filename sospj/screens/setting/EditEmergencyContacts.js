import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';

function EditEmergencyContacts({ navigation }) {
  const [contacts, setContacts] = useState([]);

  // 컴포넌트 마운트 시 데이터베이스에서 데이터 가져오기를 시뮬레이션
  useEffect(() => {
    const fetchContacts = async () => {
      // 가상의 데이터 가져오기 로직 (실제 데이터 가져오기 로직으로 교체 필요)
      const fetchedContacts = [
        { id: 1, name: 'John Doe', phone: '123-456-7890' },
        { id: 2, name: 'Jane Smith', phone: '987-654-3210' }
      ];
      setContacts(fetchedContacts);
    };

    fetchContacts();
  }, []);

  const handleSave = () => {
    // 데이터베이스에 데이터 저장을 시뮬레이션 (실제 저장 로직으로 교체 필요)
    console.log('저장된 연락처:', contacts);
    // 필요에 따라 다른 페이지로 이동하거나 확인 메시지를 표시
  };

  const handleChange = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>비상연락망 수정</Text>
      <ScrollView>
        {contacts.map((contact, index) => (
          <View key={contact.id} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={contact.name}
              onChangeText={(text) => handleChange(index, 'name', text)}
            />
            <TextInput
              style={styles.input}
              value={contact.phone}
              onChangeText={(text) => handleChange(index, 'phone', text)}
            />
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleSave}>
        <Text style={styles.buttonText}>수정 완료</Text>
      </TouchableOpacity>
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  buttonStyle: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default EditEmergencyContacts;
