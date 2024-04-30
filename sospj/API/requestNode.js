import {BACK_API_PATH} from "@env"
import axios from "axios";
export const userAxios = {
    // input : {         
    //     id: id 
    //     password: password 
    // }
    login: async (data) => {
        try{
            const request = await axios.post(BACK_API_PATH + "/login",data);
            return request.data;
        }catch(err){
            return {sc:400}
        }
    },

    signUp: async (data) => {
        try{
            const request = await axios.post(BACK_API_PATH + "/signUp",data);
            return request.data;
        }catch(err){
            return {sc:400}
        }
    },

    mainInfo: async (data) => {
        try{
            const request = await axios.post(BACK_API_PATH + "/main",data);
            return request.data;
        }catch(err){
            return {sc:400}
        }
    },

    sosList: async (data) => {
        try{
            const request = await axios.post(BACK_API_PATH + "/sos/list",data);
            return request.data;
        }catch(err){
            return {sc:400}
        }
    },

    sosUpdate: async (data) => {
        try{
            const request = await axios.post(BACK_API_PATH + "/sos/update",data);
            return request.data;
        }catch(err){
            return {sc:400}
        }
    }
    
};

export const nfcAxios ={
    nfcInsert: async (data) => {
        try{
            const request = await axios.post(BACK_API_PATH + "/nfc/insert",data);
            return request.data;
        }catch(err){
            return {sc:400}
        }
    },

    nfcList: async (data) => {
        try{
            const request = await axios.post(BACK_API_PATH + "/nfc/list",data);
            return request.data;
        }catch(err){
            return {sc:400}
        }
    }

};


