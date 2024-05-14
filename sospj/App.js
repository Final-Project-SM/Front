import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from './navigator/MainTabNavigator';
import StartStackNavigator from './navigator/StartStackNavigator';
import {UserProvider} from './components/public/UserContext';
import axios from 'axios';
import LoadingScreen from './screens/LoadingScreen';
import {getFcmToken} from './util/function/fcmToken';
function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   // 데이터 로딩이나 필요한 초기 설정을 시뮬레이션합니다.
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000); // 3초 후 로딩 상태 변경
  //   getFcmToken();
  // }, []);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }
  return (
    <UserProvider>
      <NavigationContainer>
        <StartStackNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;


//foroground 테스트 
// import React, { useState,useEffect } from 'react';
// import { View, Button, Text,AppState } from 'react-native';
// import BackgroundService from 'react-native-background-actions';

// import Geolocation from 'react-native-geolocation-service';
// import axios from 'axios'; // axios 추가
// import messaging from '@react-native-firebase/messaging';
// const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
// const App = () => {
//     const [isServiceRunning, setIsServiceRunning] = useState(false);
//     useEffect(()=>{
//       if(AppState.currentState == 'active' && BackgroundService.isRunning()){
//         setIsServiceRunning(true)
//       }
//       messaging().onMessage(async remoteMessage => {
//         //navigation.navigate('Sos')
//         console.log("onMessage: ",remoteMessage)
//       });
//       messaging().setBackgroundMessageHandler(async remoteMessage=>{
//         console.log("background: ",remoteMessage)
        
//       })
//     },[])
    
//     const getLocation = (i) => {
//       Geolocation.getCurrentPosition(
//         (position) => {
//           console.log(i," ",position.coords.latitude,position.coords.longitude)
//           try{ //192.168.0.22
//             axios.post("http://3.39.177.116:3000/login",{lat:position.coords.latitude,lon:position.coords.longitude,i:i})
//           }catch(err){
//             console.log(err)
//           }
//           //send({lat:position.coords.latitude,lon:position.coords.longitude});
//         },
//         (error) => {
//           console.log(error);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 500 }
//       );
//     }
//   const veryIntensiveTask = async (taskDataArguments) => {

//       // Example of an infinite loop task
//       const { delay } = taskDataArguments;

//       await new Promise( async (resolve) => {

//           for (let i = 0; BackgroundService.isRunning() ||AppState.currentState=='background' ; i++) {
//             try{
//               console.log(AppState.currentState)
//               getLocation(i)
//             }catch(err){
//               getLocation(i)
//             }
            
            
//             await sleep(delay)
            
//           }

//       });
//   };

//   const options = {
//       taskName: 'Example',
//       taskTitle: '위치 공유중',
//       taskDesc: '소중한 사람들에게 위치를 전송하고 있어요',
//       taskIcon: {
//           name: 'ic_launcher',
//           type: 'mipmap',
//       },
//       color: '#ff00ff',
//       linkingURI: 'sospj://test/nfc', // See Deep Linking for more info
//       parameters: {
//           delay: 1000,
//       },
//   };



//   //await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'}); // Only Android, iOS will ignore this call


//     const startService = async () => {
//         setIsServiceRunning(true);

//         await BackgroundService.start(veryIntensiveTask, options);
//     };

//     const stopService = async () => {
//         setIsServiceRunning(false);
//         await BackgroundService.stop();
//     };

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             {isServiceRunning ? (
//                 <Button title="Stop Service" onPress={stopService} />
//             ) : (
//                 <Button title="Start Service" onPress={startService} />
//             )}
//             <Text>Service is {isServiceRunning ? 'running' : 'stopped'}</Text>
//         </View>
//     );
// };

// export default App;


