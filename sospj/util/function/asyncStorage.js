import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = async (key) => {
    const result = await AsyncStorage.getItem(key);
    return result;
};
  
  // set
export const setStorage = async (key, value) => {
    await AsyncStorage.setItem(key, value);
};

  // remove
export const removeStorage = async (key) => {
  await AsyncStorage.removeItem(key)
};