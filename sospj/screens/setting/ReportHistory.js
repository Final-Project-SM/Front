import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const ReportHistory = ({navigation}) => {
  const [reports, setReports] = useState([
    {id: '1', location: '서울시 강남구', date: '2024-01-01', time: '13:45'},
    {id: '2', location: '서울시 용산구', date: '2024-01-02', time: '15:30'},
    {id: '3', location: '서울시 종로구', date: '2024-01-03', time: '17:20'},
    // 추가 데이터는 여기에...
  ]);

  // 신고 기록을 로드하는 함수 (실제 환경에서는 서버나 데이터베이스에서 데이터를 가져올 수 있습니다.)
  const loadReports = async () => {
    // 데이터 로딩 로직 구현
    // 예: 서버에서 데이터를 fetch하는 코드
  };

  useEffect(() => {
    loadReports();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => console.log('Detail View for', item.id)}>
      <Text style={styles.index}>{item.id}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.datetime}>
        {item.date} {item.time}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reports}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#E8F5E9',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  index: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    marginBottom: 5,
  },
  datetime: {
    fontSize: 14,
    color: 'grey',
  },
});

export default ReportHistory;
