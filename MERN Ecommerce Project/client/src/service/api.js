//usinng axios to call api, can use fetch of js
import axios from 'axios';


const URL = 'https://cityshop-dl21.onrender.com';

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${URL}/login`, user)
    } catch (error) {
        console.log('Error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`${URL}/signup`, user)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
        return error.response;
    }
}

export const authenticateDetails = async (user) => {
    try {
        return await axios.post(`${URL}/seller`, user)
    } catch (error) {
        console.log('Error while calling Product Entry API: ', error);
        return error.response;
    }
}
