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
  keyword: async data => { //  {"id": "e4r5", "keyword": ["피자", "ㅇㅇㅇ"]} 데이터 형식 
    try{
      console.log(data)
      const request = await axios.post(BACK_API_PATH + "/keyword", data); 
      console.log("node Api 38 Line",request.data)

    }catch(err){
      return {sc:400}
    }
  },
  keywordList: async data => {
    try{
      const request = await axios.post(BACK_API_PATH + "/keyword/list",data);
      return request.data
    }catch(err){
      return {sc:400}
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
  userChange: async data => {
    try {
      const request = await axios.post(BACK_API_PATH + '/update', data);

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
  graph: async data => {
    try {
      const request = await axios.post(BACK_API_PATH + '/graph', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
  map: async data => {
    try {
      const request = await axios.post(BACK_API_PATH + '/map', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
  sns: async data => {
    try {
      const request = await axios.post(BACK_API_PATH + '/sos/sns', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  },
  ansimi: async data => {
    try {
      const request = await axios.post(BACK_API_PATH + '/ansimi', data);
      return request.data;
    } catch (err) {
      return {sc: 400};
    }
  }
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
