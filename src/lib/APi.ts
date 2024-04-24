import { CONFIG } from '@config/config';
import { auth, getCurrentSession } from '@store/auth/authSlice';
import { useAppDispatch } from '@store/hooks';
import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { store } from "@store/store"
import { fetchAuthSession } from 'aws-amplify/auth';

export const axiosInstance = axios.create({

});

axiosInstance.interceptors.request.use(
    // @ts-ignore
    config => {
        const state = store.getState();
        const accessToken = state.auth.idToken;
        if (config.headers) {

            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }


            config.headers['Content-Type'] = 'application/json';

        }

        return config;
    });



axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                const state = store.getState(); 

                const newAccessToken = await fetchAuthSession({forceRefresh: true});
                if (newAccessToken == undefined) {
                    state.auth.loggedIn = false; 
                    console.log("session")

                }
                else {
                    state.auth.idToken = newAccessToken.tokens?.idToken?.toString()
                    error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    console.log("ran")
                    return axiosInstance(error.config);
                }

            } catch (refreshError) {
                // Handle token refresh error
                throw refreshError;
            }
        }
        return Promise.reject(error);
    }
);



export class API {

    static postNewUser(newUser: User): Promise<User> {

        return new Promise<User>((resolve, reject) => {
            axiosInstance.post(`${CONFIG.BASE_URL}/users/new-user`, newUser)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }
    static getUser(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/users/check-auth`)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    static getAllUsers(): Promise<UsersAllResponse> {
        return new Promise<UsersAllResponse>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/users/all`)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    static getTest(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/users`)
                .then((res: AxiosResponse) => {
                    resolve(res);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }



    static getAllUsersOnModule(moduleId: string): Promise<UserOnModuleResponse> {
        return new Promise<UserOnModuleResponse>((resolve, reject) => {

            axiosInstance.get(`${CONFIG.BASE_URL}/users/${moduleId}`)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    static postModule(newModule: Module): Promise<Module> {
        return new Promise<Module>((resolve, reject) => {
            axiosInstance.post(`${CONFIG.BASE_URL}/modules`, newModule)
                .then((res: AxiosResponse) => {
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
                .then((res: AxiosResponse) => {
                    resolve(res.data.data.modules);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    static getAllUserModules(userId: string): Promise<ModuleResponse[]> {
        return new Promise<ModuleResponse[]>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/modules`)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data.modules);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }


    static getAllUserModulesonModule(moduleId: string): Promise<ModuleWithUserModulesResponse> {
        return new Promise<ModuleWithUserModulesResponse>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/modules/all-user-modules/${moduleId}`)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    static postUserModules(moduleId: string, newUserModule: UserModuleRequest): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {

            axiosInstance.post(`${CONFIG.BASE_URL}/user-modules/${moduleId}`, newUserModule)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data.users);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    static deleteModule(moduleId: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            axiosInstance.delete(`${CONFIG.BASE_URL}/modules/${moduleId}`)
                .then((res: AxiosResponse) => {
                    resolve(res.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    static getAllLessonsForModule(moduleId: string): Promise<ModuleWithLessonsResponse> {
        return new Promise<ModuleWithLessonsResponse>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/lessons/all/${moduleId}`)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    static postLesson(moduleId: string, newUserModule: LessonRequest): Promise<LessonResponse> {
        return new Promise<LessonResponse>((resolve, reject) => {

            axiosInstance.post(`${CONFIG.BASE_URL}/lessons/${moduleId}`, newUserModule)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    static postQuiz(moduleId: string, newQuiz: QuizRequest): Promise<Quiz> {
        return new Promise<Quiz>((resolve, reject) => {

            axiosInstance.post(`${CONFIG.BASE_URL}/quizzes/${moduleId}`, newQuiz)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    static getAllQuizzesforModule(moduleId: string): Promise<QuizResponse> {
        return new Promise<QuizResponse>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/quizzes/all/${moduleId}`)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }


    static getFullQuiz(quizId: string): Promise<Quiz> {
        return new Promise<Quiz>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/quizzes/${quizId}`)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    static takeQuiz(quizId: string, userQuestionsData: UserQuestion): Promise<UserQuizTake> {
        return new Promise<UserQuizTake>((resolve, reject) => {
            axiosInstance.post(`${CONFIG.BASE_URL}/quizzes/take/${quizId}`, userQuestionsData)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    static getAllUserQuizTakes(quizId: string): Promise<UserQuizTakeResponse> {
        return new Promise<UserQuizTakeResponse>((resolve, reject) => {
            axiosInstance.get(`${CONFIG.BASE_URL}/user_quiz_takes/all/${quizId}`)
                .then((res: AxiosResponse) => {
                    resolve(res.data.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }


    static postBadge(newBadge: BadgeRequest): Promise<BadgeRequest> {
        return new Promise<BadgeRequest>((resolve, reject) => {
            axiosInstance.post(`${CONFIG.BASE_URL}/badges`, newBadge)
                .then((res: AxiosResponse) => {
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

    static getBadgesforCurrentUser(userId?: string): Promise<UserBadgesResponse> {

        if (userId) {
            return new Promise<UserBadgesResponse>((resolve, reject) => {
                axiosInstance.get(`${CONFIG.BASE_URL}/badges/all/${userId}`)
                    .then((res: AxiosResponse) => {
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
        else {
            return new Promise<UserBadgesResponse>((resolve, reject) => {
                axiosInstance.get(`${CONFIG.BASE_URL}/badges/all`)
                    .then((res: AxiosResponse) => {
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
    }


}
