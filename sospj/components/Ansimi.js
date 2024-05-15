
import LottieView from 'lottie-react-native';
import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity,StyleSheet,AppState } from 'react-native';
import BackgroundService from 'react-native-background-actions';

import Geolocation from 'react-native-geolocation-service';
import axios from 'axios'; // axios 추가
import messaging from '@react-native-firebase/messaging';
const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
const Ansimi = () => {
    const [isServiceRunning, setIsServiceRunning] = useState(false);
    useEffect(()=>{
        if(AppState.currentState == 'active' && BackgroundService.isRunning()){
            setIsServiceRunning(true)
        }
    },[]) 

    const getLocation = (i) => {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(i," ",position.coords.latitude,position.coords.longitude)
            try{ //192.168.0.22
              axios.post("http://192.168.0.22:3000/sos/sns",{lat:position.coords.latitude,lon:position.coords.longitude,i:i})
            }catch(err){
              console.log(err)
            }
            //send({lat:position.coords.latitude,lon:position.coords.longitude});
          },
          (error) => {
            console.log(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 500 }
        );
      }
      const veryIntensiveTask = async (taskDataArguments) => {

        // Example of an infinite loop task
        const { delay } = taskDataArguments;
  
        await new Promise( async (resolve) => {
  
            for (let i = 0; BackgroundService.isRunning() ||AppState.currentState=='background' ; i++) {
              try{
                console.log(AppState.currentState)
                getLocation(i)
              }catch(err){
                getLocation(i)
              }
              
              
              await sleep(delay)
              
            }
  
        });
    };
    const options = {
        taskName: 'Example',
        taskTitle: '위치 공유중',
        taskDesc: '소중한 사람들에게 위치를 전송하고 있어요',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff00ff',
        linkingURI: 'sospj://test/nfc', // See Deep Linking for more info
        parameters: {
            delay: 60000,
        },
    };
    const startService = async () => {

        setIsServiceRunning(true);

        await BackgroundService.start(veryIntensiveTask, options);
    };

    const stopService = async () => {

        setIsServiceRunning(false);
        await BackgroundService.stop();
    };
    return (
        <TouchableOpacity
            style={styles.contents4}
            onPress={!isServiceRunning ? startService: stopService}
        >
        <View>
            <Text
            style={isServiceRunning ? styles.activeServiceTitle : styles.serviceTitle}>
            {isServiceRunning ? '현재 위치를 공유중입니다.' : '안심귀가 서비스'}
            </Text>
            <Text style={styles.serviceText}>
            {isServiceRunning
                ? '집에 도착하시면 반드시 서비스를 종료하세요'
                : '안전하게 귀가하세요!'}
            </Text>
        </View>
        <LottieView
            style={{
            width: 70,
            height: 70,
            }}
            source={
                isServiceRunning
                ? require('../assets/lottie/process.json')
                : require('../assets/lottie/gps.json')
            }
            autoPlay
            loop={true}
        />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contents4: {
      //SOS도구
        width: 325,
        height: 80,
        backgroundColor: '#FFD1DC',
        borderColor: 'black',
        borderRadius: 15,
        marginTop: 14,
        alignItems: 'center',
        flexDirection: 'row', // 가로로 텍스트와 버튼 배치
        justifyContent: 'space-between', // 요소들 사이에 공간을 균등하게 분배
        paddingHorizontal: 20, // 좌우 패딩 추가
    },
    serviceText: {
        fontSize: 10, // 텍스트 크기 조정
        fontWeight: 'bold', // 굵은 글씨로 표시
        margin: 5,
    },
    activeServiceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F44336', // 활성화 상태일 때의 텍스트 색상 변경
    },
    serviceTitle: {
      fontSize: 16, // 텍스트 크기 조정
      fontWeight: 'bold', // 굵은 글씨로 표시
    },
});
export default Ansimi;

//foroground 테스트 




  





//   //await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'}); // Only Android, iOS will ignore this call




