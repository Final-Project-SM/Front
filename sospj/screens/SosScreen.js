import React, {useEffect,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert,Button } from 'react-native';
import axios from 'axios';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import {AI_PATH} from "@env"
import { useIsFocused } from '@react-navigation/native';
const audioRecorderPlayer = new AudioRecorderPlayer();
const audioPath = RNFS.CachesDirectoryPath+ '/test.mp4'
SosScreen = ({ navigation }) => {
    const isFocused = useIsFocused()
    const [loading,setLoading] = useState(true);
    const startrecord = async () => {
        try {
            setLoading(true)
            const result = await audioRecorderPlayer.startRecorder();
            console.log(result);
            setTimeout(async () => {
                const result2 = await audioRecorderPlayer.stopRecorder();

                audioRecorderPlayer.removeRecordBackListener();
                console.log('Recording stopped after 10 seconds');
                console.log(result2)
                const formData = new FormData();
                formData.append('file', {
                    uri: result2,
                    name: 'test',
                    type:"audio/aac"
                });
                formData.append('file',result2)
                console.log("axios")
                setLoading(false)
                const response = await axios.post("http://43.202.64.160:5000/predict", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                console.log(response.data)
                
            }, 10000); // 10초를 밀리초로 변환하여 전달
        } catch (error) {
            
            console.error('Failed to start recording: ', error);
        }
    }
    useEffect(()=>{
        if(isFocused){
            startrecord()
        }
        
    },[isFocused])

    const test = async () => {
        await navigation.navigate('Main')
    }
    if (loading){
        return (
            <View stylele = {styles.container}>
                <Text> 음성 녹음 중 </Text>
            </View>
        )
    }
    return (
        <View stylele = {styles.container}>
            <Text> 음성 녹음 끝 </Text>
            <Button title="로그인" onPress={test} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 2,
    },
  });


export default SosScreen;
