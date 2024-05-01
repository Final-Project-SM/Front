import DeviceInfo from 'react-native-device-info';
export const getDeviceInfo = async () => {
    const androidId = await DeviceInfo.getUniqueId()
    console.log(androidId)
    return androidId
}