import React, {useEffect,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert,Button,Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AudioRecorderPlayer,{AudioSourceAndroidType,OutputFormatAndroidType,AudioEncoderAndroidType} from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import {AI_PATH} from "@env"
import { useUser } from '../components/public/UserContext';
import { useIsFocused } from '@react-navigation/native';
const audioRecorderPlayer = new AudioRecorderPlayer();
const audioPath = RNFS.CachesDirectoryPath+ '/audio.wav'

SosScreen = ({ navigation }) => {
    const {user} = useUser()
    const isFocused = useIsFocused()
    const [loading,setLoading] = useState(true);
    const startrecord = async () => {
        try {
            const audioSet = {
                AudioSourceAndroid: AudioSourceAndroidType.MIC, 
                OutputFormatAndroid: OutputFormatAndroidType.DEFAULT, 
                AudioEncoderAndroid: AudioEncoderAndroidType.DEFAULT, 
            };
            setLoading(true)
            const result = await audioRecorderPlayer.startRecorder(null,audioSet);
            console.log(result);
            setTimeout(async () => {
                const result2 = await audioRecorderPlayer.stopRecorder();

                audioRecorderPlayer.removeRecordBackListener();
                console.log('Recording stopped after 10 seconds');
                console.log(result2)
                const formData = new FormData();
                

                formData.append('file', {
                    uri: result2,
                    name: 'audio4',
                    type:"audio/aac"
                });
                // formData.append('file',result2)
                formData.append("id",user.id)
                console.log("axios")
                // setLoading(false)
                console.log("1")
                const response = await axios.post("http://43.202.64.160:5000/predict", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                console.log(response.data)
                
            }, 10000); // 10초를 밀리초로 변환하여 전달
            setTimeout(()=>{navigation.navigate('Main')},11000)
        } catch (error) {
            
            console.error('Failed to start recording: ', error);
            navigation.navigate('Main')
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
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/telephone.png')} // gif 이미지 경로
                    style={styles.image}
                />
                <Text style={styles.loadingText}>음성 녹음 중...</Text>
                <ActivityIndicator size="large" color="#ff4d4f" style={styles.spinner} />
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5', // 배경 색상
    },
    image: {
      width: 100, // 이미지 너비
      height: 100, // 이미지 높이
    },
    loadingText: {
      fontSize: 24,
      color: '#ff4d4f', // 텍스트 색상
      fontWeight: 'bold', // 텍스트 굵기
      marginVertical: 16, // 수직 마진
    },
    spinner: {
      marginTop: 20, // 상단 마진
    },
  });

export default SosScreen;
