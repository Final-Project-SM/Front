import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Sound from 'react-native-sound';
import { userAxios } from '../../API/requestNode';
import { useUser } from '../../components/public/UserContext';
const VoiceData = ({navigation}) => {
  const [voiceData, setVoiceData] = useState([])
  const {user} = useUser()
  const loadData = async()=> {
    const response =await userAxios.logList({id:user.id})
    if(response.sc == 200){
      setVoiceData(response.log)
    }
  }
  useEffect(()=>{
    loadData()
  },[])


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
        {item.create_at.split('T')[0]} {item.create_at.split('T')[1].slice(0,5)} {item.location}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound("./voide")}>
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
        keyExtractor={item => item.seq}
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
