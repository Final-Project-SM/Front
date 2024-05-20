import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {userAxios} from '../../API/requestNode';
import {useUser} from '../../components/public/UserContext';
import Graph from '../../components/graph';

const VoiceData = ({navigation}) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const {user} = useUser();

  const loadData = async () => {
    const response = await userAxios.logList({id: user.id});
    if (response.sc == 200) {
      setData(response.log);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleItemPress = item => {
    setSelectedItem(selectedItem === item.seq ? null : item.seq);
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <Text style={styles.description}>
          시간 : {item.create_at.split('T')[0]}{' '}
          {item.create_at.split('T')[1].slice(0, 5)}
        </Text>
        <Text style={styles.description}>주소 : {item.location}</Text>
      </TouchableOpacity>
      {selectedItem === item.seq && (
        <Text style={styles.script}>{item.stt}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.graphText}>위치 기반 신고 통계</Text>
      <Graph />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.seq.toString()}
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  description: {
    fontSize: 14,
  },
  script: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
  },
  graphText: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
});

export default VoiceData;
