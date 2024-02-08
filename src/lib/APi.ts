import { CONFIG } from '@config/config';
import { auth, getCurrentSession } from '@store/auth/authSlice';
import { useAppDispatch } from '@store/hooks';
import axios, { AxiosInstance } from 'axios';
import { useSelector } from 'react-redux';
import {store} from "@store/store"

export const axiosInstance = axios.create({
    // headers: {
	// 	Accept: 'application/json',
	// },
});



axiosInstance.interceptors.request.use(config => {
    const state = store.getState(); // Access the Redux state
    const accessToken = state.auth.idToken; // Assuming accessToken is stored under auth slice

    if (config.headers) {

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        if (config.method !== 'get' && config.data) {
            config.headers['Content-Type'] = 'application/json';
        }


    }
    console.log(config.headers)

    return config;
});



export class API {
    static getUserClasses(userId: string) {
        // Use template literals to interpolate the userId into the URL
        return axiosInstance.get(`/${CONFIG.BASE_URL}/${userId}`);
    }

    static postNewUser(newUser: UserRequest): Promise<UserResponse> {

        return new Promise<UserResponse>((resolve, reject) => {
            axiosInstance.post(`${CONFIG.BASE_URL}/users/new-user`, newUser)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static getTest(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/users`)
                .then((res) => {
                    resolve(res); 
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

}
