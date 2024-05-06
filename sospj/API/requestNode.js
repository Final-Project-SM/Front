import {BACK_API_PATH} from '@env';
import axios from 'axios';
import {getDeviceInfo} from '../util/function/androidId';
import {getFcmToken} from '../util/function/fcmToken';
export const userAxios = {
  main: async data => {
    try {
      const request = await axios.post(BACK_API_PATH + '/main', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
  login: async data => {
    try {
      console.log(BACK_API_PATH);
      const request = await axios.post(BACK_API_PATH + '/login', data);
      console.log(1);
      return request.data;
    } catch (err) {
      console.log(err);
      return {sc: 400};
    }
  },

  signUp: async data => {
    try {
      const request = await axios.post(BACK_API_PATH + '/signUp', data);
      console.log('requestNode 25 Line : ' + request.data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },

  mainInfo: async data => {
    try {
      const request = await axios.post(BACK_API_PATH + '/main', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },

  sosList: async data => {
    try {
      const request = await axios.post(BACK_API_PATH + '/sos/list', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },

  sosChange: async data => {
    try {
      const request = await axios.post(BACK_API_PATH + '/sos/change', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },

  logList: async data => {
    try {
      const request = await axios.post(BACK_API_PATH + '/log', data);

      console.log(request.data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
};

export const nfcAxios = {
  // id, nfcid nfcname
  nfcInsert: async data => {
    try {
      const request = await axios.post(BACK_API_PATH + '/nfc/insert', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },

  nfcList: async data => {
    try {
      const request = await axios.post(BACK_API_PATH + '/nfc/list', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
};

export const fcmAxios = {
  fcmUpdate: async uid => {
    try {
      const data = {
        id: uid,
        fcm: await getFcmToken(),
        pid: await getDeviceInfo(),
      };
      console.log(data);
      const request = await axios.post(BACK_API_PATH + '/fcm/update', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
};
