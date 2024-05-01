import messaging from '@react-native-firebase/messaging';
export const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log("fcm Token",fcmToken);
    return fcmToken
}

