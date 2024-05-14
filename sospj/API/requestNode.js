import {BACK_API_PATH2} from '@env';
import axios from 'axios';
import {getDeviceInfo} from '../util/function/androidId';
import {getFcmToken} from '../util/function/fcmToken';
export const userAxios = {
  main: async data => {
    try {
      const request = await axios.post(BACK_API_PATH2 + '/main', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
  login: async data => {
    try {
      console.log(BACK_API_PATH2);
      const request = await axios.post(BACK_API_PATH2 + '/login', data);
      console.log(1);
      return request.data;
    } catch (err) {
      console.log(err);
      return {sc: 400};
    }
  },

  signUp: async data => {
    try {
      const request = await axios.post(BACK_API_PATH2 + '/signUp', data);
      console.log('requestNode 25 Line : ' + request.data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },

  mainInfo: async data => {
    try {
      const request = await axios.post(BACK_API_PATH2 + '/main', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },

  sosList: async data => {
    try {
      const request = await axios.post(BACK_API_PATH2 + '/sos/list', data);

      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
  userChange: async data => {
    try {
      const request = await axios.post(BACK_API_PATH2 + '/update', data);

      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
  sosChange: async data => {
    try {
      const request = await axios.post(BACK_API_PATH2 + '/sos/change', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },

  logList: async data => {
    try {
      const request = await axios.post(BACK_API_PATH2 + '/log', data);

      console.log(request.data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
  graph: async data => {
    try {
      const request = await axios.post(BACK_API_PATH2 + '/graph', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
  map: async data => {
    try {
      const request = await axios.post(BACK_API_PATH2 + '/map', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
  sns: async data => {
    try {
      const request = await axios.post(BACK_API_PATH2 + '/sos/sns', data);
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
      const request = await axios.post(BACK_API_PATH2 + '/nfc/insert', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },

  nfcList: async data => {
    try {
      const request = await axios.post(BACK_API_PATH2 + '/nfc/list', data);
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
      const request = await axios.post(BACK_API_PATH2 + '/fcm/update', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
};
