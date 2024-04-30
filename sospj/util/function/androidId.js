import DeviceInfo from 'react-native-device-info';
const getDeviceInfo = async () => {
    const androidId = await DeviceInfo.getUniqueId()
    console.log(androidId)
    return androidId
}