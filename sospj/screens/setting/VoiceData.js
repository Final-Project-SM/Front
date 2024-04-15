import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';

const VoiceData = ({navigation}) => {
  const [voiceData, setVoiceData] = useState([
    {id: '1', length: '30초', date: '2024-01-01', time: '12:00'},
    {id: '2', length: '45초', date: '2024-01-02', time: '14:30'},
    {id: '3', length: '60초', date: '2024-01-03', time: '16:45'},
    // 추가 데이터는 여기에...
  ]);

  // 데이터 로딩 함수 (실제 앱에서는 외부 API나 로컬 저장소에서 데이터를 불러올 것입니다)
  const loadVoiceData = async () => {
    // 데이터 로딩 로직 구현
  };

  useEffect(() => {
    loadVoiceData();
  }, []);

  const deleteItem = id => {
    setVoiceData(currentData => currentData.filter(item => item.id !== id));
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.item} onPress={() => alert('eee')}>
      <View style={styles.itemContent}>
        <Text style={styles.index}>{item.id}</Text>
        <Text style={styles.description}>
          {item.date} {item.time} - {item.length}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}>
        <Text style={styles.deleteButtonText}>삭제</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={voiceData}
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
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#E8F5E9',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContent: {
    flex: 1,
  },
  index: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default VoiceData;
