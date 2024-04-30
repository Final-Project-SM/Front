import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Sound from 'react-native-sound';

const VoiceData = ({navigation}) => {
  const [voiceData, setVoiceData] = useState([
    {
      id: '1',
      length: '30초',
      date: '2024-01-01',
      time: '12:00',
      uri: 'path_to_audio1.mp3',
    },
    {
      id: '2',
      length: '45초',
      date: '2024-01-02',
      time: '14:30',
      uri: 'path_to_audio2.mp3',
    },
    {
      id: '3',
      length: '60초',
      date: '2024-01-03',
      time: '16:45',
      uri: 'path_to_audio3.mp3',
    },
  ]);

  const playSound = uri => {
    const sound = new Sound(uri, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      sound.play(success => {
        if (!success) {
          Alert.alert('재생 실패');
        }
        sound.release();
      });
    });
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.description}>
        {item.date} {item.time} - {item.length}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(item.uri)}>
          <Text style={styles.buttonText}>재생</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default VoiceData;
