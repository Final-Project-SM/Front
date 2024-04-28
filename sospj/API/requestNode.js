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

    login: async (data) => {
        try{
            const request = await axios.post(BACK_API_PATH + "/login",data);
            return request.data;
        }catch(err){
            return {sc:400}
        }
    },
};

export const nfcAxios ={
    insert: async () => {
        return 2
    },
};


