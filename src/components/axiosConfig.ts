import axios from "axios";

const apiKey = '06ee09760d89476aa1cac84f56e08add';

export const getRequest = async (url: string): Promise<any> => {

    return await axios({
        url: url + apiKey,
        method: 'get',
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}