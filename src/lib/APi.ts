import { CONFIG } from '@config/config';
import axios, { AxiosInstance } from 'axios';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        // Add any other headers you need
      },
    
});

export class API {
    static getUserClasses(userId: string) {
        // Use template literals to interpolate the userId into the URL
        return axiosInstance.get(`/${CONFIG.BASE_URL}/${userId}`);
    }

    static postNewUser(newUser: UserRequest): Promise<UserResponse> {

        return new Promise<UserResponse>((resolve, reject) => {
            axiosInstance.post(`${CONFIG.BASE_URL}/users/new-user`,newUser)
                .then((res) => {
                    resolve(res.data); // Assuming your data is of type User
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
