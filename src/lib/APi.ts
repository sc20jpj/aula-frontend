import { CONFIG } from '@config/config';
import { auth, getCurrentSession } from '@store/auth/authSlice';
import { useAppDispatch } from '@store/hooks';
import axios, { AxiosInstance,AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { store } from "@store/store"

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


        config.headers['Content-Type'] = 'application/json';



    }

    return config;
});




export class API {

    static postNewUser(newUser: UserRequest): Promise<UserResponse> {

        return new Promise<UserResponse>((resolve, reject) => {
            axiosInstance.post(`${CONFIG.BASE_URL}/users`, newUser)
                .then((res) => {
                    resolve(res.data.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    static getUser(): Promise<UserResponse> {
        return new Promise<UserResponse>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/users/check-auth`)
                .then((res) => {
                    resolve(res.data.data);
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



    static getAllUsersOnModule(moduleId: string): Promise<UserOnModuleResponse> {
        return new Promise<UserOnModuleResponse>((resolve, reject) => {
            
            axiosInstance.get(`${CONFIG.BASE_URL}/users/${moduleId}`)
                .then((res) => {
                    resolve(res.data.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static postModule(newModule: Module): Promise<Module> {
        return new Promise<Module>((resolve, reject) => {
            axiosInstance.post(`${CONFIG.BASE_URL}/modules`, newModule)
                .then((res) => {
                    resolve(res.data.data);
                    
                })
                .catch((error: AxiosError) => {
                    console.log(error.response?.status)
                    if (error.response?.status == 409) {
                        reject("Module already exists. Check the module code and try again.")
                    }
                });
        });
    }

    static getAllModules(): Promise<Module[]> {
        return new Promise<Module[]>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/modules/all`)
                .then((res) => {
                    resolve(res.data.data.modules);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static getAllUserModules(userId: string): Promise<ModuleResponse[]> {
        return new Promise<ModuleResponse[]>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/modules`)
                .then((res) => {
                    resolve(res.data.data.modules);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    static postUserModules(moduleId: string, newUserModule: UserModuleRequest): Promise<UserResponse[]> {
        return new Promise<UserResponse[]>((resolve, reject) => {

            axiosInstance.post(`${CONFIG.BASE_URL}/user-modules/${moduleId}`,newUserModule)
                .then((res) => {
                    resolve(res.data.data.users);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static deleteModule(moduleId: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            axiosInstance.delete(`${CONFIG.BASE_URL}/modules/${moduleId}`)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static getAllLessonsForModule(moduleId: string): Promise<ModuleWithLessonsResponse> {
        return new Promise<ModuleWithLessonsResponse>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/lessons/all/${moduleId}`)
                .then((res) => {
                    resolve(res.data.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    static postLesson(moduleId: string, newUserModule: LessonRequest): Promise<LessonResponse> {
        return new Promise<LessonResponse>((resolve, reject) => {

            axiosInstance.post(`${CONFIG.BASE_URL}/lessons/${moduleId}`,newUserModule)
                .then((res) => {
                    resolve(res.data.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static postQuiz(moduleId: string, newQuiz: QuizRequest): Promise<Quiz> {
        return new Promise<Quiz>((resolve, reject) => {

            axiosInstance.post(`${CONFIG.BASE_URL}/quizzes/${moduleId}`,newQuiz)
                .then((res) => {
                    resolve(res.data.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static getAllQuizzesforModule(moduleId: string): Promise<QuizResponse> {
        return new Promise<QuizResponse>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/quizzes/all/${moduleId}`)
                .then((res) => {
                    resolve(res.data.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }


    static getFullQuiz(quizId: string): Promise<Quiz> {
        return new Promise<Quiz>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/quizzes/${quizId}`)
                .then((res) => {
                    resolve(res.data.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static takeQuiz(quizId: string,userQuestionsData: UserQuestion): Promise<UserQuizTake> {
        return new Promise<UserQuizTake>((resolve, reject) => {
            axiosInstance.post(`${CONFIG.BASE_URL}/quizzes/take/${quizId}`,userQuestionsData)
                .then((res) => {
                    resolve(res.data.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static getAllUserQuizTakes(quizId: string): Promise<UserQuizTakeResponse> {
        return new Promise<UserQuizTakeResponse>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/user_quiz_takes/all/${quizId}`)
                .then((res) => {
                    resolve(res.data.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

}
