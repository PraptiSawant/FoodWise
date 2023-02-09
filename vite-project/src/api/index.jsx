import axios from "axios";
const BASE_URL ='https://localhost:7246/api/';

export const createAPIEndpoint = endpoint => {
    let url=BASE_URL+endpoint+"/";
    return {
        fetchall:()=>axios.get(url),
        fetchById: id => axios.get(url + id),
        create : newRecord => axios.post(url.newRecord),
        update: (id,updateRecord)=> axios.put(url+id,updateRecord)
    }
}